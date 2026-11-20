// Adds a Content-Security-Policy <meta> tag to every page of the static export (out/**/*.html).
// GitHub Pages cannot send CSP headers, so the policy is written into each page instead.
// `script-src` allows only this site and the SHA-256 hashes of that page's own inline scripts,
// so no 'unsafe-inline' is needed. Run after `next build` (see package.json).
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = join(ROOT, "out");
const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
const HEAD_RE = /<head\b[^>]*>/i;
const META_MARKER = 'http-equiv="Content-Security-Policy"';

/** The contact API is the only external origin the page may talk to (same value the build inlines). */
function contactOrigin() {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL;
  return endpoint ? new URL(endpoint).origin : null;
}

async function listHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return listHtml(path);
      return entry.name.endsWith(".html") ? [path] : [];
    }),
  );
  return files.flat();
}

/** Inline classic or module scripts are executed under CSP, so they need a hash; data blocks do not. */
function isExecutableInline(attributes) {
  if (/\bsrc\s*=/i.test(attributes)) return false;
  const type = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attributes)?.[1]?.toLowerCase();
  return (
    !type || type === "module" || type === "text/javascript" || type === "application/javascript"
  );
}

function inlineScriptHashes(html) {
  const hashes = new Set();
  for (const match of html.matchAll(SCRIPT_RE)) {
    if (!isExecutableInline(match[1])) continue;
    const digest = createHash("sha256").update(match[2], "utf8").digest("base64");
    hashes.add(`'sha256-${digest}'`);
  }
  return [...hashes];
}

const origin = contactOrigin();
const files = await listHtml(OUT_DIR);
if (files.length === 0) throw new Error(`No HTML files found in ${OUT_DIR}. Run next build first.`);

let updated = 0;
for (const file of files) {
  const html = await readFile(file, "utf8");
  if (html.includes(META_MARKER)) continue;
  if (!HEAD_RE.test(html)) throw new Error(`No <head> element in ${file}`);

  // The hashes are computed before the meta is inserted; the meta is not a script, so they stay valid.
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${inlineScriptHashes(html).join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${origin ? ` ${origin}` : ""}`,
    "form-action 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
  const meta = `<meta ${META_MARKER} content="${policy}"/>`;

  // Placed first in <head> so the policy also covers the scripts that follow it.
  await writeFile(
    file,
    html.replace(HEAD_RE, (head) => `${head}${meta}`),
    "utf8",
  );
  updated += 1;
}

console.log(`CSP: policy written to ${updated} of ${files.length} page(s).`);

// Local development server for the contact API, so the form can be tested without deploying.
// Serves the same handler as Vercel at http://localhost:4000/api/contact.
// Run with: npm run dev   (reads GMAIL_USER, GMAIL_APP_PASSWORD and ALLOWED_ORIGIN from .env.local)
import { createServer } from "node:http";

const { default: handler } = await import("./api/contact.js");
const PORT = Number(process.env.PORT ?? 4000);
const MAX_BODY_BYTES = 64 * 1024;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

// Adapts Node's request/response objects to the Vercel-style helpers the handler uses.
function adapt(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(payload));
    return res;
  };
  return res;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  if (url.pathname !== "/api/contact") {
    res.statusCode = 404;
    return res.end("Not found");
  }

  adapt(res);
  try {
    const raw = req.method === "POST" ? await readBody(req) : "";
    req.body = raw ? JSON.parse(raw) : {};
  } catch {
    return res.status(400).json({ success: false, message: "Invalid request body." });
  }

  await handler(req, res);
});

server.listen(PORT, () => {
  console.log(`Contact API running at http://localhost:${PORT}/api/contact`);
  console.log(`Allowed origin: ${process.env.ALLOWED_ORIGIN ?? "(not set)"}`);
});

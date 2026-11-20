import type { ReactNode } from "react";

import type { Project } from "@/types";

/*
 * CSS-only product visuals for featured projects. Purely decorative (the parent marks them
 * aria-hidden); the hashes, block heights and addresses are illustrative mock UI, not data.
 */

function WindowChrome({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full border border-border-strong" />
        <span className="size-2.5 rounded-full border border-border-strong" />
        <span className="size-2.5 rounded-full border border-border-strong" />
      </span>
      <span className="font-mono text-[0.68rem] tracking-wide text-subtle">{label}</span>
      <span className="ml-auto">{children}</span>
    </div>
  );
}

function LivePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[0.62rem] text-muted">
      <span className="animate-pulse-dot relative size-1.5 rounded-full bg-success" />
      {children}
    </span>
  );
}

const blocks = [
  { height: "#2,048", hash: "0x9f3a…e1c4", txs: 4, pending: true },
  { height: "#2,047", hash: "0x51bd…07fa", txs: 7 },
  { height: "#2,046", hash: "0xc08e…9b13", txs: 2 },
  { height: "#2,045", hash: "0x7d24…a6e0", txs: 5 },
];

/** Stylised DCLScan-like block explorer: a live chain of blocks with confirmations. */
export function ExplorerVisual() {
  return (
    <div className="overflow-hidden rounded-2xl">
      <WindowChrome label="dclscan / blocks">
        <LivePill>Live</LivePill>
      </WindowChrome>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 font-mono text-[0.68rem] text-subtle">
          <span className="size-3 rounded-full border-2 border-subtle/60" />
          Search block, tx or address
          <span className="ml-auto rounded border border-border px-1.5 text-[0.6rem]">/</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["Consensus", "PoS"],
            ["Hashing", "SHA-256"],
            ["Sync", "WebSocket"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border bg-surface px-2.5 py-2">
              <p className="font-mono text-[0.55rem] tracking-[0.12em] text-subtle uppercase">
                {label}
              </p>
              <p className="mt-1 truncate text-xs font-semibold text-foreground sm:text-sm">
                {value}
              </p>
            </div>
          ))}
        </div>

        <ol className="relative space-y-2 pl-5">
          <span className="absolute top-3 bottom-3 left-[0.4rem] w-px bg-linear-to-b from-accent via-border-strong to-transparent" />
          {blocks.map((block) => (
            <li
              key={block.height}
              className={
                block.pending
                  ? "pj-block-in relative rounded-xl border border-accent/40 bg-accent-soft px-3 py-2.5"
                  : "relative rounded-xl border border-border bg-surface px-3 py-2.5"
              }
            >
              <span
                className={
                  block.pending
                    ? "pj-blink absolute top-1/2 -left-[1.06rem] size-2.5 -translate-y-1/2 rounded-full bg-accent"
                    : "absolute top-1/2 -left-[1.06rem] size-2.5 -translate-y-1/2 rounded-full border border-border-strong bg-surface"
                }
              />
              <div className="flex items-center gap-3 font-mono text-[0.68rem]">
                <span className="font-semibold text-foreground">{block.height}</span>
                <span className="truncate text-subtle">{block.hash}</span>
                <span className="ml-auto shrink-0 text-subtle">{block.txs} txs</span>
              </div>
              {block.pending ? (
                <div className="mt-2 flex items-center gap-2">
                  <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-border">
                    <span className="pj-fill absolute inset-0 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[0.58rem] tracking-wide text-accent uppercase">
                    Confirming
                  </span>
                </div>
              ) : (
                <p className="mt-1 font-mono text-[0.58rem] tracking-wide text-subtle uppercase">
                  ✓ Finalized
                </p>
              )}
            </li>
          ))}
        </ol>

        <p className="flex items-center justify-between border-t border-border pt-3 font-mono text-[0.6rem] text-subtle">
          <span>merkle root</span>
          <span className="text-muted">0x3e7c…41d9</span>
        </p>
      </div>
    </div>
  );
}

const mintSteps = [
  { label: "Upload metadata to IPFS", state: "done" },
  { label: "Sign with Phantom", state: "done" },
  { label: "Mint on Solana", state: "active" },
] as const;

/** Stylised wallet + mint card for the Solana NFT dApp. */
export function MintVisual() {
  return (
    <div className="overflow-hidden rounded-2xl">
      <WindowChrome label="mint / new">
        <LivePill>7xKX…9fQe</LivePill>
      </WindowChrome>

      <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1fr] sm:p-5">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 210deg at 35% 40%, var(--accent-2), var(--accent), var(--surface-raised), var(--accent-2))",
            }}
          />
          <div className="absolute -right-6 -bottom-6 size-28 rounded-full bg-background/40 blur-xl" />
          <div className="absolute top-4 left-4 size-14 rounded-full border border-foreground/20 bg-background/25" />
          <span className="absolute right-2.5 bottom-2.5 left-2.5 truncate rounded-lg bg-background/80 px-2 py-1 font-mono text-[0.58rem] text-muted">
            ipfs://bafybe…q4m
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <dl className="space-y-1.5 font-mono text-[0.62rem]">
            {[
              ["Storage", "IPFS · Pinata"],
              ["Network", "Solana"],
              ["Wallet", "Phantom"],
            ].map(([term, value]) => (
              <div
                key={term}
                className="flex justify-between gap-2 border-b border-border pb-1.5 last:border-0"
              >
                <dt className="text-subtle">{term}</dt>
                <dd className="text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <ol className="space-y-1.5">
            {mintSteps.map((step) => (
              <li key={step.label} className="flex items-center gap-2 text-[0.7rem] text-muted">
                {step.state === "done" ? (
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent text-[0.55rem] font-bold text-accent-foreground">
                    ✓
                  </span>
                ) : (
                  <span className="pj-spin size-4 shrink-0 rounded-full border-2 border-border-strong border-t-accent" />
                )}
                <span className={step.state === "active" ? "text-foreground" : undefined}>
                  {step.label}
                </span>
              </li>
            ))}
          </ol>

          <span className="relative mt-auto inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            Mint NFT
            <span className="pj-sheen absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-surface/40" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Fallback for any other featured project: a terminal listing its stack. */
export function StackVisual({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-2xl">
      <WindowChrome label="~/projects" />
      <div className="space-y-1.5 p-5 font-mono text-[0.7rem]">
        <p className="text-subtle">
          <span className="text-accent">$</span> cat stack.json
        </p>
        {project.stack.map((tech, index) => (
          <p key={tech} className="text-muted">
            <span className="text-subtle">{String(index + 1).padStart(2, "0")}</span> {tech}
          </p>
        ))}
        <p className="pj-blink text-accent">▍</p>
      </div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  const key = `${project.title} ${project.stack.join(" ")}`;
  if (/solana|nft/i.test(key)) return <MintVisual />;
  if (/chain|blockchain|ledger/i.test(key)) return <ExplorerVisual />;
  return <StackVisual project={project} />;
}

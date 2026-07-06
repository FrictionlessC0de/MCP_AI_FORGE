import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Hammer, ArrowRight, BookText, Rocket, Wrench, Cloud, Terminal, ShieldCheck,
  Zap, Cpu, GitBranch, FileCode, Search, ChevronRight, Sparkles, Box, Network,
} from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs — MCP Forge" },
      { name: "description", content: "Learn how to design, generate, test and deploy Model Context Protocol tools with MCP Forge — guides, schema reference, deploy targets and the AI debugger." },
      { property: "og:title", content: "MCP Forge Docs" },
      { property: "og:description", content: "Guides, references and recipes for building MCP tools." },
    ],
  }),
});

type Doc = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  read: string;
  summary: string;
  body: { kind: "p" | "h" | "code" | "li"; text: string }[];
};

const DOCS: Doc[] = [
  {
    id: "introduction",
    title: "Introduction to MCP Forge",
    icon: Sparkles,
    category: "Getting Started",
    read: "2 min",
    summary: "What MCP Forge is, why it exists, and the philosophy behind a real-time MCP workspace.",
    body: [
      { kind: "p", text: "MCP Forge is a real-time development environment for the Model Context Protocol. Design a tool, generate its server, test it in a sandbox and deploy it to Cursor, VS Code or any agent — without leaving the workspace." },
      { kind: "h", text: "Core principles" },
      { kind: "li", text: "Every action feels like building real software, not filling forms." },
      { kind: "li", text: "Tools are versioned artifacts, not throwaway templates." },
      { kind: "li", text: "The sandbox is the source of truth — if it runs, it ships." },
    ],
  },
  {
    id: "quickstart",
    title: "Quickstart: your first tool in 60 seconds",
    icon: Rocket,
    category: "Getting Started",
    read: "3 min",
    summary: "From empty workspace to a working MCP tool deployed to Cursor.",
    body: [
      { kind: "h", text: "1. Open the Studio" },
      { kind: "p", text: "Head to the Studio and pick Prompt mode. Describe what your tool should do in plain language." },
      { kind: "code", text: 'forge new "search the GitHub API and return starred repos for a user"' },
      { kind: "h", text: "2. Generate" },
      { kind: "p", text: "Forge produces a schema, server, MCP config and integration shims. Watch the pipeline run live." },
      { kind: "h", text: "3. Test in the sandbox" },
      { kind: "p", text: "Invoke the tool from the right panel. Logs stream in real time, with auth and schema validation surfaced inline." },
      { kind: "h", text: "4. Deploy" },
      { kind: "code", text: "forge deploy --target cursor" },
    ],
  },
  {
    id: "schema",
    title: "Schema reference",
    icon: FileCode,
    category: "Reference",
    read: "5 min",
    summary: "The MCP tool schema: inputs, outputs, auth, and side-effects.",
    body: [
      { kind: "p", text: "Every MCP Forge tool is described by a single declarative schema. The runtime enforces it at every invocation." },
      { kind: "code", text: `{
  "name": "github.search_repos",
  "version": "1.0.0",
  "input": {
    "query": { "type": "string", "required": true },
    "limit": { "type": "number", "default": 10 }
  },
  "auth": { "type": "oauth", "provider": "github" },
  "output": { "type": "array", "items": "Repo" }
}` },
      { kind: "li", text: "input — typed, validated, documented." },
      { kind: "li", text: "auth — oauth | apiKey | none. Forge handles token refresh." },
      { kind: "li", text: "output — typed, streamed when possible." },
    ],
  },
  {
    id: "sandbox",
    title: "Testing in the sandbox",
    icon: Terminal,
    category: "Guides",
    read: "4 min",
    summary: "Invoke tools, inspect logs, replay sessions and pin failing inputs.",
    body: [
      { kind: "p", text: "The sandbox is a fully isolated runtime. Every invocation captures inputs, outputs, latency, and a structured log trail." },
      { kind: "li", text: "Pin a failing input to lock it as a regression test." },
      { kind: "li", text: "Replay any historical invocation against a new tool version." },
      { kind: "li", text: "Stream logs to your local terminal with `forge logs --follow`." },
    ],
  },
  {
    id: "ai-debugger",
    title: "AI Debugger",
    icon: Cpu,
    category: "Guides",
    read: "3 min",
    summary: "Ask the workspace why a tool failed — it reads logs, schema and config to answer.",
    body: [
      { kind: "p", text: "Open the debugger and ask in natural language. The agent has full read access to your tool's source, schema, recent logs and deploy config." },
      { kind: "code", text: 'debug "why did github.search_repos return 401 on the last 3 calls?"' },
      { kind: "p", text: "It will trace the failure end-to-end and propose a fix you can apply in one click." },
    ],
  },
  {
    id: "versioning",
    title: "Versioning & forks",
    icon: GitBranch,
    category: "Guides",
    read: "3 min",
    summary: "Every tool has a full history. Fork, remix, rollback or branch a tool like code.",
    body: [
      { kind: "p", text: "Tools are first-class artifacts with semantic versions, immutable history and one-click rollback." },
      { kind: "li", text: "Fork any public tool to start your own variant." },
      { kind: "li", text: "Diff two versions side-by-side, including schema." },
      { kind: "li", text: "Pin agents to a specific version for reproducibility." },
    ],
  },
  {
    id: "deploy-cursor",
    title: "Deploying to Cursor",
    icon: Cloud,
    category: "Deploy",
    read: "2 min",
    summary: "Wire a Forge tool into Cursor's MCP config in one command.",
    body: [
      { kind: "p", text: "Forge generates a `.cursor/mcp.json` entry for you. Copy it into your repo or let Forge install it directly." },
      { kind: "code", text: "forge deploy --target cursor --install" },
    ],
  },
  {
    id: "deploy-vscode",
    title: "Deploying to VS Code",
    icon: Box,
    category: "Deploy",
    read: "2 min",
    summary: "Run Forge tools from any VS Code agent extension.",
    body: [
      { kind: "p", text: "Export an MCP server bundle and register it with your VS Code agent of choice." },
      { kind: "code", text: "forge export --target vscode --out ./mcp-server" },
    ],
  },
  {
    id: "security",
    title: "Security model",
    icon: ShieldCheck,
    category: "Reference",
    read: "4 min",
    summary: "Sandboxing, secrets, scopes and audit trails.",
    body: [
      { kind: "p", text: "Forge runs every tool in a sandboxed runtime with a deny-by-default network policy. Secrets are encrypted at rest and never leave the runtime boundary." },
      { kind: "li", text: "Scoped tokens — each tool gets its own credential namespace." },
      { kind: "li", text: "Audit log — every invocation, by whom, against which version." },
      { kind: "li", text: "Egress allowlist — declare hosts your tool can call in the schema." },
    ],
  },
  {
    id: "cli",
    title: "CLI reference",
    icon: Wrench,
    category: "Reference",
    read: "5 min",
    summary: "Every command, flag and exit code for the forge CLI.",
    body: [
      { kind: "code", text: `forge new <prompt>          # scaffold from a prompt
forge gen                   # regenerate from schema
forge run <tool> [input]    # invoke locally in the sandbox
forge logs --follow         # stream sandbox logs
forge deploy --target <t>   # deploy to cursor | vscode | docker | cloud
forge fork <tool>@<ver>     # fork a tool at a version
forge rollback <tool> <ver> # roll back a deployed tool` },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: Network,
    category: "Reference",
    read: "3 min",
    summary: "GitHub, Vercel, Linear, Stripe, Postgres and more — first-class connectors.",
    body: [
      { kind: "p", text: "Connectors handle auth, rate-limits and pagination so your tool stays a thin layer of business logic. Add a connector with one line in the schema." },
      { kind: "code", text: '"connectors": ["github", "vercel", "linear"]' },
    ],
  },
  {
    id: "remix",
    title: "Remix system",
    icon: Zap,
    category: "Guides",
    read: "2 min",
    summary: "Fork any tool, change one thing, republish.",
    body: [
      { kind: "p", text: "Find a tool you like, hit Remix, and you'll land in the Studio with a forked copy. Your changes are tracked against the parent so upstream improvements can be merged later." },
    ],
  },
];

const CATEGORIES = ["All", "Getting Started", "Guides", "Reference", "Deploy"];

function DocsPage() {
  const [active, setActive] = useState<string>("introduction");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    return DOCS.filter(d =>
      (cat === "All" || d.category === cat) &&
      (query === "" || (d.title + d.summary).toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, cat]);

  const doc = DOCS.find(d => d.id === active) ?? DOCS[0];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundFX />
      <DocsNav />

      <div className="mx-auto max-w-7xl px-5 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[11px] font-medium text-ember">
            <BookText className="h-3 w-3" /> Documentation
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Build, test & ship MCP tools.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Everything you need to go from a prompt to a deployed Model Context Protocol tool — guides,
            references and recipes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="glass sticky top-20 rounded-xl border border-border/60 p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search docs"
                  className="w-full rounded-md border border-border/70 bg-background/40 py-2 pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-ember/60"
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] transition ${
                      cat === c
                        ? "border-ember/60 bg-ember/15 text-ember"
                        : "border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <nav className="mt-4 space-y-0.5">
                {filtered.length === 0 && (
                  <div className="px-2 py-6 text-center text-xs text-muted-foreground">No docs match.</div>
                )}
                {filtered.map(d => {
                  const Icon = d.icon;
                  const isActive = d.id === active;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setActive(d.id)}
                      className={`group flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs transition ${
                        isActive
                          ? "bg-ember/12 text-foreground"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-ember" : ""}`} />
                      <span className="flex-1 truncate">{d.title}</span>
                      <ChevronRight className={`h-3 w-3 transition ${isActive ? "translate-x-0.5 text-ember" : "opacity-0 group-hover:opacity-100"}`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:col-span-8 xl:col-span-9">
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="glass rounded-2xl border border-border/60 p-6 md:p-9"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <span className="text-ember">{doc.category}</span>
                <span>·</span>
                <span>{doc.read} read</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">{doc.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">{doc.summary}</p>

              <div className="mt-7 space-y-5">
                {doc.body.map((block, i) => {
                  if (block.kind === "h") {
                    return <h3 key={i} className="mt-4 font-display text-lg font-semibold">{block.text}</h3>;
                  }
                  if (block.kind === "li") {
                    return (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                        <span>{block.text}</span>
                      </div>
                    );
                  }
                  if (block.kind === "code") {
                    return (
                      <pre key={i} className="overflow-x-auto rounded-lg border border-border/60 bg-background/60 p-4 font-mono text-[12px] leading-relaxed text-foreground/90">
                        <code>{block.text}</code>
                      </pre>
                    );
                  }
                  return <p key={i} className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{block.text}</p>;
                })}
              </div>

              {/* Prev / next */}
              <DocsPager active={doc.id} onSelect={setActive} />
            </motion.div>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-ember/30 bg-gradient-to-br from-ember/10 to-transparent p-6 md:flex-row md:items-center">
              <div>
                <div className="font-display text-lg font-semibold">Ready to forge?</div>
                <div className="text-sm text-muted-foreground">Open the Studio and ship your first tool in a minute.</div>
              </div>
              <Link
                to="/studio"
                className="group inline-flex items-center gap-1.5 rounded-md bg-gradient-to-br from-ember to-ember-glow px-4 py-2.5 text-xs font-semibold text-primary-foreground ember-glow"
              >
                Open Studio
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function DocsPager({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const idx = DOCS.findIndex(d => d.id === active);
  const prev = idx > 0 ? DOCS[idx - 1] : null;
  const next = idx < DOCS.length - 1 ? DOCS[idx + 1] : null;
  if (!prev && !next) return null;
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 border-t border-border/60 pt-6">
      <div>
        {prev && (
          <button onClick={() => onSelect(prev.id)} className="group block w-full rounded-lg border border-border/60 p-3 text-left transition hover:border-ember/40">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Previous</div>
            <div className="mt-1 truncate text-sm font-medium group-hover:text-ember">{prev.title}</div>
          </button>
        )}
      </div>
      <div>
        {next && (
          <button onClick={() => onSelect(next.id)} className="group block w-full rounded-lg border border-border/60 p-3 text-right transition hover:border-ember/40">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Next</div>
            <div className="mt-1 truncate text-sm font-medium group-hover:text-ember">{next.title}</div>
          </button>
        )}
      </div>
    </div>
  );
}

function DocsNav() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember to-ember-glow ember-glow">
            <Hammer className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="font-display text-base font-semibold tracking-tight">MCP Forge</div>
          <span className="ml-2 hidden rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground md:inline">Docs</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <Link to="/docs" className="text-foreground">Docs</Link>
          <Link to="/studio" className="hover:text-foreground">Studio</Link>
        </nav>
        <Link
          to="/studio"
          className="group flex items-center gap-1.5 rounded-md bg-gradient-to-br from-ember to-ember-glow px-3.5 py-2 text-xs font-semibold text-primary-foreground ember-glow"
        >
          Open Studio
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}

function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.25]" />
      <motion.div
        className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.19 52 / 25%), transparent)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

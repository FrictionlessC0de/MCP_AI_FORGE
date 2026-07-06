import { useMemo, useState } from "react";
import {
  Search, Plus, Rocket, Settings, ChevronDown, Hammer, Sparkles, Zap,
  Github, Database, Bot, Briefcase, Wrench, GitFork, Eye, Plug,
  FileCode, FileJson, BookText, Box, Play, Activity, CheckCircle2,
  AlertCircle, GitBranch, Network, Bug, Layers, Globe, Terminal,
  ArrowUpRight, Cpu, Cloud, ShieldCheck, Workflow,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/studio")({
  component: Forge,
});

/* ----------------------------- DATA ----------------------------- */

type Category = "Developer" | "Data" | "AI" | "Productivity" | "Custom";
type Platform = "Cursor" | "VS Code" | "MCP";

interface Tool {
  id: string;
  name: string;
  summary: string;
  category: Category;
  platforms: Platform[];
  complexity: "Low" | "Medium" | "High";
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // ember | plasma | mint | violet
}

const TOOLS: Tool[] = [
  { id: "gh-pr", name: "github.summarize_pr", summary: "Summarize PRs with AI context", category: "Developer", platforms: ["Cursor", "VS Code", "MCP"], complexity: "Medium", icon: Github, accent: "ember" },
  { id: "pg-q", name: "postgres.query", summary: "Run safe SQL with row-level guards", category: "Data", platforms: ["Cursor", "MCP"], complexity: "High", icon: Database, accent: "plasma" },
  { id: "notion", name: "notion.create_page", summary: "Create + template Notion pages", category: "Productivity", platforms: ["Cursor", "VS Code"], complexity: "Low", icon: BookText, accent: "mint" },
  { id: "ai-rerank", name: "ai.rerank_results", summary: "Rerank search hits via embeddings", category: "AI", platforms: ["MCP"], complexity: "Medium", icon: Bot, accent: "violet" },
  { id: "slack", name: "slack.post_thread", summary: "Post threaded messages to channels", category: "Productivity", platforms: ["Cursor", "MCP"], complexity: "Low", icon: Briefcase, accent: "ember" },
  { id: "deploy", name: "vercel.deploy", summary: "Trigger and stream deploy logs", category: "Developer", platforms: ["Cursor", "VS Code", "MCP"], complexity: "Medium", icon: Cloud, accent: "plasma" },
  { id: "scrape", name: "web.scrape_clean", summary: "Fetch + readability clean HTML", category: "Data", platforms: ["MCP"], complexity: "Low", icon: Globe, accent: "mint" },
  { id: "lint", name: "code.lint_diff", summary: "Lint just the changed lines", category: "Developer", platforms: ["Cursor", "VS Code"], complexity: "Medium", icon: Wrench, accent: "violet" },
];

const CATEGORIES: { key: Category | "All"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "All", label: "All tools", icon: Layers },
  { key: "Developer", label: "Developer", icon: Wrench },
  { key: "Data", label: "Data", icon: Database },
  { key: "AI", label: "AI", icon: Bot },
  { key: "Productivity", label: "Productivity", icon: Briefcase },
  { key: "Custom", label: "Custom", icon: Sparkles },
];

const accentClass = (a: string) => {
  switch (a) {
    case "plasma": return "text-plasma bg-plasma/10 border-plasma/30";
    case "mint":   return "text-mint bg-mint/10 border-mint/30";
    case "violet": return "text-violet bg-violet/10 border-violet/30";
    default:       return "text-ember bg-ember/10 border-ember/30";
  }
};

/* ----------------------------- ROOT ----------------------------- */

function Forge() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <div className="grid flex-1 min-h-0 grid-cols-12 gap-3 p-3">
        <aside className="col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-2">
          <ToolExplorer />
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-5 xl:col-span-6">
          <Studio />
        </main>
        <aside className="col-span-12 lg:col-span-4 xl:col-span-4">
          <PreviewPanel />
        </aside>
      </div>
      <StatusBar />
    </div>
  );
}

/* --------------------------- TOP BAR --------------------------- */

function TopBar() {
  return (
    <header className="sticky top-0 z-30 glass border-b border-border/60">
      <div className="flex h-14 items-center gap-3 px-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ember to-ember-glow ember-glow">
            <Hammer className="h-4 w-4 text-primary-foreground" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-mint animate-pulse-ember" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold tracking-tight">MCP Forge</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">build · test · deploy</div>
          </div>
        </div>

        <div className="mx-3 hidden h-7 w-px bg-border md:block" />

        <button className="hidden md:flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground transition">
          acme-workspace <ChevronDown className="h-3.5 w-3.5" />
        </button>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2 glass rounded-md px-3 py-1.5 w-[340px]">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search tools, schemas, deploys…"
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
        </div>

        <button className="flex items-center gap-1.5 rounded-md border border-border/70 bg-surface-2 px-3 py-1.5 text-xs font-medium hover:bg-surface-3 transition">
          <Plus className="h-3.5 w-3.5" /> New tool
        </button>
        <button className="flex items-center gap-1.5 rounded-md bg-gradient-to-br from-ember to-ember-glow px-3 py-1.5 text-xs font-semibold text-primary-foreground ember-glow hover:opacity-95 transition">
          <Rocket className="h-3.5 w-3.5" /> Deploy
        </button>
        <button className="rounded-md p-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground transition">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

/* ------------------------- LEFT PANEL ------------------------- */

function ToolExplorer() {
  const [active, setActive] = useState<Category | "All">("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() =>
    TOOLS.filter(t =>
      (active === "All" || t.category === active) &&
      (q === "" || t.name.toLowerCase().includes(q.toLowerCase()) || t.summary.toLowerCase().includes(q.toLowerCase()))
    ),
  [active, q]);

  return (
    <div className="flex h-[calc(100vh-4.5rem-2.5rem)] flex-col rounded-xl border border-border/60 bg-card/40 glass overflow-hidden">
      <div className="p-3 border-b border-border/60">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <Layers className="h-3.5 w-3.5 text-ember" /> Ecosystem
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-md bg-surface-2 px-2.5 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="github, db, automation…"
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex flex-col gap-0.5 px-2 py-2 border-b border-border/60">
        {CATEGORIES.map(c => {
          const Icon = c.icon;
          const isActive = active === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition ${
                isActive ? "bg-ember/12 text-foreground" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-ember" : ""}`} />
                {c.label}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {c.key === "All" ? TOOLS.length : TOOLS.filter(t => t.category === c.key).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filtered.map(t => <ToolCard key={t.id} tool={t} />)}
        {filtered.length === 0 && (
          <div className="p-6 text-center text-xs text-muted-foreground">No tools match.</div>
        )}
      </div>

      <div className="border-t border-border/60 p-2">
        <button className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border/80 px-2 py-2 text-xs text-muted-foreground hover:border-ember/50 hover:text-ember transition">
          <Plus className="h-3.5 w-3.5" /> Forge a new tool
        </button>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className="group relative rounded-lg border border-border/60 bg-surface-1/70 p-2.5 transition hover:border-ember/40 hover:bg-surface-2">
      <div className="flex items-start gap-2.5">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${accentClass(tool.accent)}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-xs font-medium truncate">{tool.name}</div>
          <div className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{tool.summary}</div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {tool.platforms.map(p => (
              <span key={p} className="rounded border border-border/60 bg-background/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {p}
              </span>
            ))}
            <span className={`ml-auto rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${
              tool.complexity === "Low" ? "text-mint" : tool.complexity === "Medium" ? "text-ember" : "text-violet"
            }`}>
              {tool.complexity}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <ActionChip icon={GitFork} label="Fork" />
        <ActionChip icon={Eye} label="Schema" />
        <ActionChip icon={Plug} label="Use" primary />
      </div>
    </div>
  );
}

function ActionChip({ icon: Icon, label, primary }: { icon: React.ComponentType<{ className?: string }>; label: string; primary?: boolean }) {
  return (
    <button className={`flex items-center gap-1 rounded px-1.5 py-1 font-mono text-[10px] transition ${
      primary ? "bg-ember/15 text-ember hover:bg-ember/25" : "bg-surface-3/60 text-muted-foreground hover:text-foreground"
    }`}>
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}

/* ---------------------------- STUDIO ---------------------------- */

function Studio() {
  const [mode, setMode] = useState<"prompt" | "structured">("prompt");
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    "Designing tool schema…",
    "Generating MCP server…",
    "Creating runtime config…",
    "Building integration layer…",
    "Finalizing export package…",
  ];

  const generate = () => {
    setGenerating(true); setStep(0);
    let i = 0;
    const tick = () => {
      i++;
      if (i >= steps.length) { setGenerating(false); setStep(steps.length); return; }
      setStep(i);
      setTimeout(tick, 700);
    };
    setTimeout(tick, 700);
  };

  return (
    <div className="flex h-[calc(100vh-4.5rem-2.5rem)] flex-col rounded-xl border border-border/60 bg-card/40 glass overflow-hidden">
      {/* Studio header */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ember/15">
            <Sparkles className="h-3.5 w-3.5 text-ember" />
          </span>
          <div>
            <div className="font-display text-sm font-semibold">MCP Studio</div>
            <div className="text-[10px] text-muted-foreground font-mono">untitled-tool · draft · v0.1.0</div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border/60 bg-surface-2 p-0.5">
          {(["prompt", "structured"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded px-2.5 py-1 text-[11px] font-medium capitalize transition ${
                mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "prompt" ? "Natural language" : "Structured builder"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* SECTION A — Designer */}
        <section className="p-4">
          <SectionLabel n="A" title="Tool Designer" hint="Describe what your tool does, and Forge will design the schema." />
          {mode === "prompt" ? <PromptDesigner /> : <StructuredDesigner />}
        </section>

        {/* SECTION B — Configuration */}
        <section className="border-t border-border/60 p-4">
          <SectionLabel n="B" title="Configuration" hint="Pick runtime, target agents and integrations." />
          <Configuration />
        </section>

        {/* SECTION C — Generate */}
        <section className="border-t border-border/60 p-4">
          <SectionLabel n="C" title="Generate Engine" hint="Compile the entire MCP system in one shot." />
          <div className="rounded-xl border border-ember/30 bg-gradient-to-br from-ember/10 via-transparent to-violet/10 p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={generate}
                disabled={generating}
                className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-br from-ember to-ember-glow px-4 py-2.5 text-sm font-semibold text-primary-foreground ember-glow hover:opacity-95 transition disabled:opacity-70"
              >
                <Zap className="h-4 w-4" />
                {generating ? "Forging…" : "Generate MCP System"}
              </button>
              <div className="text-xs text-muted-foreground">Estimated · ~4s · 5 stages</div>
            </div>

            <div className="mt-4 space-y-1.5">
              {steps.map((s, i) => {
                const done = step > i || (!generating && step === steps.length);
                const active = generating && step === i;
                return (
                  <div key={s} className="flex items-center gap-2.5 text-xs">
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      done ? "border-mint bg-mint/15 text-mint"
                      : active ? "border-ember bg-ember/15 text-ember animate-pulse-ember"
                      : "border-border text-muted-foreground"
                    }`}>
                      {done ? <CheckCircle2 className="h-2.5 w-2.5" /> : <span className="h-1 w-1 rounded-full bg-current" />}
                    </span>
                    <span className={`font-mono ${done ? "text-foreground" : active ? "text-foreground animate-flicker" : "text-muted-foreground"}`}>
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MCP Visual Graph */}
          <div className="mt-4 rounded-xl border border-border/60 bg-surface-1/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Network className="h-3.5 w-3.5 text-plasma" /> MCP visual graph
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                <GitBranch className="h-3 w-3" /> main · v0.1.0
              </div>
            </div>
            <Graph />
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionLabel({ n, title, hint }: { n: string; title: string; hint: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="flex h-6 w-6 items-center justify-center rounded border border-ember/30 bg-ember/10 font-mono text-[10px] font-semibold text-ember">{n}</span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-muted-foreground">{hint}</div>
      </div>
    </div>
  );
}

function PromptDesigner() {
  const [val, setVal] = useState("Create a tool that summarizes GitHub pull requests, extracts breaking changes, and posts to Slack.");
  return (
    <div className="rounded-xl border border-border/60 bg-surface-1/60 p-3">
      <div className="flex items-center gap-2 px-1 pb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-ember" />
        prompt
      </div>
      <textarea
        value={val}
        onChange={e => setVal(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-md bg-background/60 p-3 font-mono text-sm leading-relaxed outline-none ring-1 ring-border/60 focus:ring-ember/60 transition"
      />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {["+ inputs", "+ output schema", "+ auth", "+ rate limit", "+ error handling"].map(s => (
          <button key={s} className="rounded-full border border-border/60 bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground hover:border-ember/40 transition">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function StructuredDesigner() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Tool name", value: "github.summarize_pr" },
        { label: "Description", value: "Summarize GitHub PR with breaking changes" },
        { label: "Inputs", value: "owner, repo, pr_number" },
        { label: "Outputs", value: "summary, risk_level, breaking[]" },
      ].map(f => (
        <div key={f.label} className="rounded-lg border border-border/60 bg-surface-1/60 p-2.5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label}</div>
          <div className="mt-1 font-mono text-xs">{f.value}</div>
        </div>
      ))}
    </div>
  );
}

function Configuration() {
  const groups = [
    { label: "Language", options: ["TypeScript", "JavaScript", "Python"], active: "TypeScript", accent: "ember" },
    { label: "Runtime", options: ["Node", "Serverless", "Edge"], active: "Node", accent: "plasma" },
    { label: "Target", options: ["Cursor", "VS Code", "Universal MCP"], active: "Cursor", accent: "violet" },
  ];
  return (
    <div className="space-y-3">
      {groups.map(g => (
        <div key={g.label} className="flex items-center gap-3">
          <div className="w-20 text-[11px] uppercase tracking-wider text-muted-foreground">{g.label}</div>
          <div className="flex flex-wrap gap-1.5">
            {g.options.map(o => {
              const active = o === g.active;
              return (
                <button key={o} className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition ${
                  active ? `${accentClass(g.accent)} border` : "border-border/60 bg-surface-2 text-muted-foreground hover:text-foreground"
                }`}>{o}</button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3 pt-1">
        <div className="w-20 text-[11px] uppercase tracking-wider text-muted-foreground">Auth</div>
        <Toggle label="OAuth required" on />
        <Toggle label="API key" />
        <Toggle label="Rate limit" on />
      </div>

      <div className="flex items-center gap-3">
        <div className="w-20 text-[11px] uppercase tracking-wider text-muted-foreground">Integrations</div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "GitHub", icon: Github, on: true },
            { label: "Notion", icon: BookText, on: false },
            { label: "Slack", icon: Briefcase, on: true },
            { label: "Postgres", icon: Database, on: false },
            { label: "Custom", icon: Plus, on: false },
          ].map(({ label, icon: Icon, on }) => (
            <button key={label} className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] transition ${
              on ? "border-mint/40 bg-mint/10 text-mint" : "border-border/60 bg-surface-2 text-muted-foreground hover:text-foreground"
            }`}>
              <Icon className="h-3 w-3" /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, on }: { label: string; on?: boolean }) {
  const [v, setV] = useState(!!on);
  return (
    <button onClick={() => setV(!v)} className="flex items-center gap-2 text-[11px]">
      <span className={`relative h-4 w-7 rounded-full transition ${v ? "bg-ember" : "bg-surface-3"}`}>
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all ${v ? "left-3.5" : "left-0.5"}`} />
      </span>
      <span className={v ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </button>
  );
}

function Graph() {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg bg-grid">
      <svg viewBox="0 0 600 130" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="line1" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.74 0.19 52)" />
            <stop offset="100%" stopColor="oklch(0.82 0.14 200)" />
          </linearGradient>
        </defs>
        <line x1="80" y1="65" x2="220" y2="65" stroke="url(#line1)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="280" y1="65" x2="400" y2="65" stroke="url(#line1)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="460" y1="65" x2="560" y2="65" stroke="url(#line1)" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
      <div className="relative grid h-full grid-cols-4 items-center px-3">
        {[
          { label: "User", icon: Bot, accent: "violet" },
          { label: "MCP Tool", icon: Wrench, accent: "ember" },
          { label: "API", icon: Globe, accent: "plasma" },
          { label: "AI Agent", icon: Cpu, accent: "mint" },
        ].map(n => {
          const Icon = n.icon;
          return (
            <div key={n.label} className="flex flex-col items-center gap-1.5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${accentClass(n.accent)}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">{n.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------ RIGHT PANEL ------------------------ */

const FILES = [
  { name: "server.ts", icon: FileCode, accent: "ember" },
  { name: "mcp.json", icon: FileJson, accent: "plasma" },
  { name: "schema.json", icon: FileJson, accent: "violet" },
  { name: "README.md", icon: BookText, accent: "mint" },
  { name: "package.json", icon: Box, accent: "ember" },
];

const SAMPLE: Record<string, string> = {
  "server.ts": `import { McpServer } from "@modelcontextprotocol/sdk";
import { z } from "zod";

const server = new McpServer({
  name: "github.summarize_pr",
  version: "0.1.0",
});

server.tool(
  "summarize_pr",
  {
    owner: z.string(),
    repo: z.string(),
    pr_number: z.number(),
  },
  async ({ owner, repo, pr_number }) => {
    const pr = await fetchPR(owner, repo, pr_number);
    return summarize(pr);
  }
);

server.start();`,
  "mcp.json": `{
  "name": "github.summarize_pr",
  "version": "0.1.0",
  "transport": "stdio",
  "targets": ["cursor", "vscode", "mcp"],
  "auth": { "oauth": true }
}`,
  "schema.json": `{
  "input": {
    "owner": "string",
    "repo": "string",
    "pr_number": "number"
  },
  "output": {
    "summary": "string",
    "risk_level": "low | med | high",
    "breaking": "string[]"
  }
}`,
  "README.md": `# github.summarize_pr

Summarizes a GitHub pull request and posts the result to Slack.

## Install
\`\`\`
npx mcp-forge install github.summarize_pr
\`\`\``,
  "package.json": `{
  "name": "github.summarize_pr",
  "version": "0.1.0",
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.23.0"
  }
}`,
};

function PreviewPanel() {
  const [tab, setTab] = useState<"files" | "sandbox" | "deploy">("files");
  return (
    <div className="flex h-[calc(100vh-4.5rem-2.5rem)] flex-col rounded-xl border border-border/60 bg-card/40 glass overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-plasma/15">
            <Activity className="h-3.5 w-3.5 text-plasma" />
          </span>
          <div className="font-display text-sm font-semibold">Live Preview</div>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-ember" /> sandbox · ready
        </div>
      </div>

      <div className="flex border-b border-border/60 px-2 py-1.5 gap-1">
        {([
          { k: "files", label: "Files", icon: FileCode },
          { k: "sandbox", label: "Test sandbox", icon: Terminal },
          { k: "deploy", label: "Deploy", icon: Rocket },
        ] as const).map(({ k, label, icon: Icon }) => {
          const active = tab === k;
          return (
            <button key={k} onClick={() => setTab(k)} className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
              active ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}>
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-hidden">
        {tab === "files" && <FilesView />}
        {tab === "sandbox" && <SandboxView />}
        {tab === "deploy" && <DeployView />}
      </div>

      <Insights />
    </div>
  );
}

function FilesView() {
  const [active, setActive] = useState("server.ts");
  const Icon = FILES.find(f => f.name === active)!.icon;
  return (
    <div className="grid h-full grid-cols-[140px_1fr]">
      <div className="border-r border-border/60 p-1.5 overflow-y-auto">
        {FILES.map(f => {
          const FIcon = f.icon;
          const isActive = active === f.name;
          return (
            <button key={f.name} onClick={() => setActive(f.name)} className={`flex w-full items-center gap-1.5 rounded px-2 py-1.5 font-mono text-[11px] transition ${
              isActive ? `${accentClass(f.accent)} border` : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            }`}>
              <FIcon className="h-3 w-3" /> {f.name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <Icon className="h-3 w-3" /> {active}
          </div>
          <button className="font-mono text-[10px] text-muted-foreground hover:text-ember">copy</button>
        </div>
        <pre className="flex-1 overflow-auto bg-background/60 p-3 font-mono text-[11px] leading-relaxed text-foreground/90">
          <code>{SAMPLE[active]}</code>
        </pre>
      </div>
    </div>
  );
}

function SandboxView() {
  const [input, setInput] = useState('{ "owner": "vercel", "repo": "next.js", "pr_number": 5832 }');
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true); setLogs([]);
    const lines = [
      "→ tool invoked  github.summarize_pr",
      "→ auth: oauth ✓",
      "→ fetch /repos/vercel/next.js/pulls/5832 (218ms)",
      "→ parse diff … 14 files / +812 / -340",
      "→ extract breaking changes (2)",
      "✓ response returned · 122ms",
    ];
    let i = 0;
    const tick = () => {
      if (i >= lines.length) { setRunning(false); return; }
      setLogs(prev => [...prev, lines[i]]); i++;
      setTimeout(tick, 350);
    };
    setTimeout(tick, 200);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/60 p-3">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Input</div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 rounded-md bg-background/60 px-3 py-2 font-mono text-[11px] outline-none ring-1 ring-border/60 focus:ring-ember/60"
          />
          <button onClick={run} disabled={running} className="flex items-center gap-1.5 rounded-md bg-gradient-to-br from-ember to-ember-glow px-3 py-2 text-xs font-semibold text-primary-foreground ember-glow hover:opacity-95 disabled:opacity-60 transition">
            <Play className="h-3.5 w-3.5" /> Run
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 bg-background/40 bg-dots">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">MCP call log</div>
        <div className="space-y-1 font-mono text-[11px]">
          {logs.length === 0 && !running && (
            <div className="text-muted-foreground italic">// click run to invoke the tool</div>
          )}
          {logs.map((l, i) => (
            <div key={i} className={l.startsWith("✓") ? "text-mint" : "text-foreground/80"}>
              <span className="text-muted-foreground mr-2">{String(i+1).padStart(2,"0")}</span>
              {l}
            </div>
          ))}
          {running && <div className="text-ember animate-flicker">…streaming</div>}
        </div>

        {logs.length >= 6 && (
          <div className="mt-3 rounded-md border border-mint/30 bg-mint/5 p-2.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-mint mb-1">Response</div>
            <pre className="font-mono text-[11px] leading-relaxed text-foreground/90">
{`{
  "summary": "Refactors the router cache & adds RSC streaming",
  "risk_level": "med",
  "breaking": ["router.cache API renamed", "Drops Node 16"]
}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function DeployView() {
  const targets = [
    { name: "Cursor", path: ".cursor/mcp.json", icon: Wrench, accent: "ember" },
    { name: "VS Code Extension", path: ".vscode/mcp-wrapper", icon: FileCode, accent: "plasma" },
    { name: "Generic MCP server", path: "stdio · http", icon: Terminal, accent: "violet" },
    { name: "Docker container", path: "ghcr.io/forge/...", icon: Box, accent: "mint" },
    { name: "Cloud (Forge edge)", path: "*.forge.run", icon: Cloud, accent: "ember" },
  ];
  return (
    <div className="h-full overflow-y-auto p-3 space-y-2">
      {targets.map(t => {
        const Icon = t.icon;
        return (
          <div key={t.name} className="group flex items-center gap-3 rounded-lg border border-border/60 bg-surface-1/60 p-3 hover:border-ember/40 hover:bg-surface-2 transition">
            <div className={`flex h-9 w-9 items-center justify-center rounded-md border ${accentClass(t.accent)}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium">{t.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground truncate">{t.path}</div>
            </div>
            <button className="flex items-center gap-1 rounded-md bg-surface-3 px-2.5 py-1.5 text-[11px] font-medium text-foreground/90 group-hover:bg-ember group-hover:text-primary-foreground transition">
              Deploy <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Insights() {
  const items = [
    { label: "Health", value: "Operational", icon: ShieldCheck, accent: "mint" },
    { label: "Cursor", value: "Compatible", icon: CheckCircle2, accent: "mint" },
    { label: "VS Code", value: "Compatible", icon: CheckCircle2, accent: "mint" },
    { label: "Schema", value: "1 warning", icon: AlertCircle, accent: "ember" },
    { label: "p50", value: "122ms", icon: Activity, accent: "plasma" },
  ];
  return (
    <div className="border-t border-border/60 p-2 grid grid-cols-5 gap-1">
      {items.map(i => {
        const Icon = i.icon;
        return (
          <div key={i.label} className="rounded-md bg-surface-1/60 px-2 py-1.5">
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-muted-foreground">
              <Icon className={`h-2.5 w-2.5 ${i.accent === "mint" ? "text-mint" : i.accent === "ember" ? "text-ember" : "text-plasma"}`} />
              {i.label}
            </div>
            <div className="mt-0.5 font-mono text-[11px]">{i.value}</div>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------- STATUS BAR --------------------------- */

function StatusBar() {
  return (
    <footer className="flex h-9 items-center justify-between border-t border-border/60 bg-surface-1/70 px-4 font-mono text-[10px] text-muted-foreground">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5"><GitBranch className="h-3 w-3" /> main · v0.1.0</span>
        <span className="flex items-center gap-1.5"><Workflow className="h-3 w-3" /> 3 stages cached</span>
        <span className="flex items-center gap-1.5"><Bug className="h-3 w-3 text-ember" /> AI debugger ready</span>
      </div>
      <div className="flex items-center gap-4">
        <span>MCP spec · 2024-11</span>
        <span className="flex items-center gap-1.5 text-mint"><span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-ember" /> all systems green</span>
      </div>
    </footer>
  );
}

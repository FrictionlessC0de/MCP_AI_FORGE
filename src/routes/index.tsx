import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Hammer, Sparkles, Zap, Rocket, ArrowRight, Github, Database, Bot, Wrench,
  Cloud, Terminal, Cpu, Globe, BookText, Briefcase, Box, Play, CheckCircle2,
  Network, GitBranch, ShieldCheck, Activity, FileCode, ChevronRight, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "MCP Forge — Build, test & deploy MCP tools at the speed of thought" },
      { name: "description", content: "A real-time MCP development environment. Design tools with AI, test them instantly, and ship to Cursor, VS Code or any agent." },
      { property: "og:title", content: "MCP Forge — The MCP workspace" },
      { property: "og:description", content: "Figma for MCP tools. Vercel for deployment. Cursor-like AI workspace." },
    ],
  }),
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundFX />
      <Nav />
      <Hero />
      <Marquee />
      <FeatureGrid />
      <LiveDemo />
      <DeployTargets />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ======================== BACKGROUND FX ======================== */

function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <motion.div
        className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.19 52 / 35%), transparent)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40vh] -left-40 h-[500px] w-[700px] rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.70 0.20 295 / 28%), transparent)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[80vh] -right-40 h-[500px] w-[700px] rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.82 0.14 200 / 25%), transparent)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

/* ============================ NAV ============================ */

function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", v => setScrolled(v > 20)), [scrollY]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 transition-all ${scrolled ? "glass border-b border-border/60" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember to-ember-glow ember-glow"
          >
            <Hammer className="h-4 w-4 text-primary-foreground" />
          </motion.div>
          <div className="font-display text-base font-semibold tracking-tight">MCP Forge</div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="story-link transition hover:text-foreground">Features</a>
          <Link to="/studio" className="story-link transition hover:text-foreground">Studio</Link>
          <a href="#deploy" className="story-link transition hover:text-foreground">Deploy</a>
          <Link to="/docs" className="story-link transition hover:text-foreground">Docs</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#" className="hidden rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground md:inline-flex">Sign in</a>
          <Link
            to="/studio"
            className="group flex items-center gap-1.5 rounded-md bg-gradient-to-br from-ember to-ember-glow px-3.5 py-2 text-xs font-semibold text-primary-foreground ember-glow transition hover:opacity-95"
          >
            Open Studio
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

/* ============================ HERO ============================ */

function Hero() {
  const heading = "Forge MCP tools at the speed of thought.";
  const words = heading.split(" ");

  return (
    <section className="relative mx-auto max-w-7xl px-5 pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[11px] font-medium text-ember"
          >
            <Sparkles className="h-3 w-3" /> v0.1 — invite-only beta
            <span className="mx-1 h-1 w-1 rounded-full bg-ember/60" />
            Universal MCP runtime
          </motion.div>

          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {w === "thought." ? <span className="text-gradient-ember">{w}</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            A real-time workspace to design, generate, test and ship Model Context Protocol tools — for Cursor, VS Code, Claude, or any agent that speaks MCP.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/studio"
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-ember to-ember-glow px-5 py-3 text-sm font-semibold text-primary-foreground ember-glow transition hover:opacity-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Zap className="h-4 w-4" /> Launch the Forge
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a href="#demo" className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/60 px-4 py-3 text-sm font-medium hover:border-ember/40 hover:bg-surface-3 transition">
              <Play className="h-3.5 w-3.5 text-ember" /> Watch live demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-wider text-muted-foreground"
          >
            <Stat n={3128} suffix="+" label="tools forged" />
            <span className="h-3 w-px bg-border" />
            <Stat n={42} suffix="ms" label="median test latency" />
            <span className="h-3 w-px bg-border" />
            <Stat n={99.9} suffix="%" label="MCP spec coverage" decimals={1} />
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, suffix, label, decimals = 0 }: { n: number; suffix: string; label: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1500, bounce: 0 });
  useEffect(() => {
    const ctrl = animate(mv, n, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    const unsub = spring.on("change", v => {
      if (ref.current) ref.current.textContent = v.toFixed(decimals);
    });
    return () => { ctrl.stop(); unsub(); };
  }, [mv, spring, n, decimals]);
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display text-base font-semibold text-foreground" ref={ref}>0</span>
      <span className="font-display text-base font-semibold text-ember">{suffix}</span>
      <span>{label}</span>
    </div>
  );
}

/* ===================== HERO VISUAL (live card) ===================== */

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* Floating glow */}
      <motion.div
        className="absolute -inset-6 -z-10 rounded-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.19 52 / 35%), transparent 70%)" }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="glass relative rounded-2xl border border-border/60 p-4 shadow-card">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
          </div>
          <div className="font-mono text-[10px] text-muted-foreground">github.summarize_pr · live</div>
          <div className="flex items-center gap-1 text-[10px] text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-ember" /> ready
          </div>
        </div>

        <Typewriter />
        <FloatingChip className="-left-6 top-12" icon={Github} label="github" accent="ember" delay={0.6} />
        <FloatingChip className="-right-8 top-32" icon={Database} label="postgres" accent="plasma" delay={1.0} />
        <FloatingChip className="-left-10 bottom-20" icon={Cloud} label="vercel" accent="violet" delay={1.4} />
        <FloatingChip className="-right-6 bottom-6" icon={Bot} label="cursor" accent="mint" delay={1.8} />

        <RuntimeLog />
      </div>

      {/* Reflection */}
      <div className="mt-2 h-16 rounded-2xl bg-gradient-to-b from-ember/15 to-transparent blur-xl opacity-60" />
    </motion.div>
  );
}

function Typewriter() {
  const lines = [
    { c: "// describe your tool", color: "text-muted-foreground" },
    { c: "create a tool that summarizes GitHub PRs", color: "text-foreground" },
    { c: "  └─ extracts breaking changes", color: "text-muted-foreground" },
    { c: "  └─ posts result to Slack", color: "text-muted-foreground" },
    { c: "→ generating mcp server…", color: "text-ember" },
    { c: "✓ schema · server · runtime · package", color: "text-mint" },
  ];
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0; let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      if (i >= lines.length) return;
      i++;
      setCount(i);
      if (i < lines.length) setTimeout(tick, i === 4 ? 900 : 500);
    };
    const start = setTimeout(tick, 500);
    return () => { cancelled = true; clearTimeout(start); };
  }, []);

  const done = count >= lines.length;

  return (
    <pre className="mt-3 min-h-[140px] font-mono text-[11px] leading-relaxed">
      {lines.slice(0, count).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={line.color}
        >
          {line.c}
        </motion.div>
      ))}
      {!done && (
        <span className="inline-block h-3 w-1.5 translate-y-0.5 bg-ember animate-pulse" />
      )}
    </pre>
  );
}

function FloatingChip({ className, icon: Icon, label, accent, delay }: { className: string; icon: React.ComponentType<{ className?: string }>; label: string; accent: string; delay: number }) {
  const accentColor = accent === "plasma" ? "text-plasma border-plasma/40 bg-plasma/10"
    : accent === "violet" ? "text-violet border-violet/40 bg-violet/10"
    : accent === "mint" ? "text-mint border-mint/40 bg-mint/10"
    : "text-ember border-ember/40 bg-ember/10";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1, scale: 1,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute flex items-center gap-1.5 rounded-full border ${accentColor} px-2.5 py-1 font-mono text-[10px] backdrop-blur-md ${className}`}
    >
      <Icon className="h-3 w-3" /> {label}
    </motion.div>
  );
}

function RuntimeLog() {
  return (
    <div className="mt-3 rounded-lg border border-border/60 bg-background/60 p-2.5">
      <div className="mb-1.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
        <span>runtime · stdout</span>
        <span className="text-mint">122ms</span>
      </div>
      <div className="space-y-0.5 font-mono text-[10px]">
        <div className="text-foreground/80">→ tool invoked</div>
        <div className="text-foreground/80">→ fetch /pulls/5832</div>
        <div className="text-mint">✓ response · 2 breaking changes</div>
      </div>
    </div>
  );
}

/* ============================ MARQUEE ============================ */

function Marquee() {
  const items = [
    "github", "postgres", "notion", "slack", "linear", "stripe", "supabase",
    "vercel", "openai", "cursor", "vscode", "claude", "anthropic", "n8n",
  ];
  const row = [...items, ...items];
  return (
    <section className="border-y border-border/60 bg-surface-1/30 py-6">
      <div className="text-center text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
        Speaks MCP with everything
      </div>
      <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {row.map((it, i) => (
            <span key={i} className="font-display text-2xl font-semibold text-muted-foreground/60 hover:text-ember transition">
              {it}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ========================= FEATURE GRID ========================= */

const FEATURES = [
  { icon: Sparkles, title: "AI Tool Designer", desc: "Describe a tool in plain English. Forge generates schema, server, runtime, and tests in one shot.", accent: "ember", span: "lg:col-span-2" },
  { icon: Terminal, title: "Live test sandbox", desc: "Invoke any tool instantly. See logs, latency, and structured output as it streams.", accent: "plasma" },
  { icon: Network, title: "Visual MCP graph", desc: "Trace user → tool → API → agent. Spot bottlenecks before users do.", accent: "violet" },
  { icon: GitBranch, title: "Tool versioning", desc: "Git-style versions, forks, and rollbacks for every tool in your workspace.", accent: "mint" },
  { icon: Cloud, title: "Universal deploy", desc: "Ship to Cursor, VS Code, Docker, or the Forge edge — same artifact, every target.", accent: "ember", span: "lg:col-span-2" },
] as const;

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-20 md:py-32">
      <SectionHeader
        eyebrow="The workspace"
        title={<>Everything an MCP tool needs, <span className="text-gradient-ember">in one canvas</span>.</>}
        sub="Stop juggling generators, READMEs, and config files. Forge is one place to design, ship and observe."
      />
      <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} idx={i} />)}
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc, accent, span, idx }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; accent: string; span?: string; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(e.clientX - r.left); my.set(e.clientY - r.top);
  };
  const accentBorder = accent === "plasma" ? "hover:border-plasma/40"
    : accent === "violet" ? "hover:border-violet/40"
    : accent === "mint" ? "hover:border-mint/40"
    : "hover:border-ember/40";
  const iconClass = accent === "plasma" ? "text-plasma bg-plasma/10 border-plasma/30"
    : accent === "violet" ? "text-violet bg-violet/10 border-violet/30"
    : accent === "mint" ? "text-mint bg-mint/10 border-mint/30"
    : "text-ember bg-ember/10 border-ember/30";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 transition ${accentBorder} ${span ?? ""}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform([mx, my], ([x, y]) =>
            `radial-gradient(400px circle at ${x}px ${y}px, oklch(0.74 0.19 52 / 18%), transparent 40%)`
          ),
        }}
      />
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[11px] font-mono uppercase tracking-[0.25em] text-ember"
      >{eyebrow}</motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
      >{title}</motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-base text-muted-foreground"
      >{sub}</motion.p>
    </div>
  );
}

/* ========================= LIVE DEMO ========================= */

function LiveDemo() {
  const steps = [
    { label: "Designing schema", icon: FileCode },
    { label: "Generating MCP server", icon: Cpu },
    { label: "Wiring integrations", icon: Network },
    { label: "Running test in sandbox", icon: Terminal },
    { label: "Ready to deploy", icon: Rocket },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), 1600);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <section id="demo" className="relative mx-auto max-w-7xl px-5 py-20 md:py-32">
      <SectionHeader
        eyebrow="Real-time"
        title={<>From idea to invocation in <span className="text-gradient-ember">one keystroke</span>.</>}
        sub="Watch a tool come to life. No build steps, no config files to copy-paste."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative mt-14 grid gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 lg:grid-cols-[1fr_1.4fr] glass"
      >
        {/* Pipeline */}
        <div className="rounded-xl border border-border/60 bg-surface-1/60 p-5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Forge pipeline</div>
          <div className="mt-4 space-y-2.5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              const isDone = i < active;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isActive ? "oklch(0.74 0.19 52 / 0.18)" : isDone ? "oklch(0.82 0.18 155 / 0.12)" : "oklch(0.27 0.025 270 / 0.5)",
                    }}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      isActive ? "border-ember/50 text-ember" : isDone ? "border-mint/40 text-mint" : "border-border text-muted-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </motion.div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isActive ? "text-foreground" : isDone ? "text-foreground/80" : "text-muted-foreground"}`}>
                      {s.label}
                    </div>
                    <div className="mt-1 h-0.5 w-full overflow-hidden rounded bg-surface-3">
                      <motion.div
                        className="h-full bg-gradient-to-r from-ember to-ember-glow"
                        initial={{ width: "0%" }}
                        animate={{ width: isDone ? "100%" : isActive ? "65%" : "0%" }}
                        transition={{ duration: isActive ? 1.4 : 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Output terminal */}
        <div className="rounded-xl border border-border/60 bg-background/70 p-5 bg-dots">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <Activity className="h-3 w-3 text-plasma" /> sandbox · live
            </div>
            <div className="font-mono text-[10px] text-mint flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-ember" /> 122ms
            </div>
          </div>
          <div className="space-y-1 font-mono text-[11px] leading-relaxed">
            {[
              { l: "$ forge run github.summarize_pr", c: "text-muted-foreground" },
              { l: "→ tool invoked", c: "text-foreground/85" },
              { l: "→ auth: oauth ✓", c: "text-foreground/85" },
              { l: "→ fetch /repos/vercel/next.js/pulls/5832", c: "text-foreground/85" },
              { l: "→ extract breaking changes (2)", c: "text-foreground/85" },
              { l: "✓ response returned", c: "text-mint" },
            ].map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.1 + i * 0.08 }}
                className={row.c}
              >{row.l}</motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-4 rounded-lg border border-mint/30 bg-mint/5 p-3"
          >
            <div className="mb-1 text-[10px] font-mono uppercase tracking-wider text-mint">structured output</div>
            <pre className="font-mono text-[11px] leading-relaxed text-foreground/90">
{`{
  "summary": "Refactors router cache + adds RSC streaming",
  "risk_level": "med",
  "breaking": ["router.cache renamed", "Drops Node 16"]
}`}
            </pre>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ======================= DEPLOY TARGETS ======================= */

const TARGETS = [
  { name: "Cursor", path: ".cursor/mcp.json", icon: Wrench, accent: "ember" },
  { name: "VS Code", path: "extension wrapper", icon: FileCode, accent: "plasma" },
  { name: "Claude / Generic MCP", path: "stdio · http", icon: Bot, accent: "violet" },
  { name: "Docker", path: "ghcr.io/forge", icon: Box, accent: "mint" },
  { name: "Forge Edge", path: "*.forge.run", icon: Cloud, accent: "ember" },
  { name: "n8n / workflows", path: "node bridge", icon: Briefcase, accent: "plasma" },
];

function DeployTargets() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:py-32">
      <SectionHeader
        eyebrow="Deploy"
        title={<>One artifact. <span className="text-gradient-ember">Every agent.</span></>}
        sub="Forge produces a single source of truth and adapts it to each runtime — no per-target rewrites."
      />
      <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TARGETS.map((t, i) => {
          const Icon = t.icon;
          const acc = t.accent === "plasma" ? "text-plasma bg-plasma/10 border-plasma/30"
            : t.accent === "violet" ? "text-violet bg-violet/10 border-violet/30"
            : t.accent === "mint" ? "text-mint bg-mint/10 border-mint/30"
            : "text-ember bg-ember/10 border-ember/30";
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card/50 p-4 transition hover:border-ember/40"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${acc}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="font-mono text-[10px] text-muted-foreground truncate">{t.path}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-ember" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ========================= FINAL CTA ========================= */

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-ember/30 bg-gradient-to-br from-ember/15 via-violet/10 to-plasma/10 p-10 text-center md:p-16"
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <motion.div
          className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, oklch(0.74 0.19 52 / 50%), transparent)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-background/60 px-3 py-1 text-[11px] font-medium text-ember">
            <ShieldCheck className="h-3 w-3" /> Free during beta
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Stop generating templates. <span className="text-gradient-ember">Start forging tools.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Open the Studio and ship your first MCP tool in the next 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/studio"
              className="group flex items-center gap-2 rounded-lg bg-gradient-to-br from-ember to-ember-glow px-6 py-3.5 text-sm font-semibold text-primary-foreground ember-glow transition hover:opacity-95"
            >
              <Rocket className="h-4 w-4" /> Open the Forge
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a href="#" className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-5 py-3.5 text-sm font-medium hover:border-ember/40 transition">
              <Star className="h-3.5 w-3.5 text-ember" /> Star on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================ FOOTER ============================ */

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface-1/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-ember to-ember-glow">
            <Hammer className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-foreground">MCP Forge</span>
          <span className="font-mono">· built on the Model Context Protocol</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Changelog</a>
          <a href="#" className="flex items-center gap-1 hover:text-foreground"><Globe className="h-3 w-3" /> status</a>
        </div>
      </div>
    </footer>
  );
}

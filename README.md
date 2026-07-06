# MCP Forge

A real-time IDE for designing, generating, testing, and deploying **Model Context Protocol (MCP)** tools — for Cursor, VS Code, Claude, or any agent that speaks MCP.

## Stack

- **Frontend**: React 19, TanStack Router (file-based routing), TanStack Query, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Server**: Cloudflare Workers (via `@cloudflare/vite-plugin` + Wrangler), TanStack Start server functions
- **Database**: Cloudflare D1 (SQLite)
- **AI**: OpenAI (GPT-4o) via `src/lib/llm.ts`
- **Tooling**: Vite 8, TypeScript 6, Biome

## Project structure

```
src/
  lib/
    env.ts         # Cloudflare bindings access (set from server.ts fetch handler)
    db.ts          # D1 database layer with auto-migrations (tools + invocations tables)
    llm.ts         # OpenAI integration for MCP tool generation
    schemas.ts     # Zod schemas shared between frontend and server
  server-fns/
    tools.ts       # CRUD server functions (listTools, getTool, createTool, deleteTool)
    generate.ts    # Prompt-to-MCP generation via LLM
    sandbox.ts     # Tool invocation (simulated execution via LLM)
  routes/
    index.tsx      # Marketing landing page
    studio.tsx     # Core IDE — wired to real server functions
    docs.tsx       # Documentation viewer
    __root.tsx     # Root layout with QueryClient
  server.ts        # Cloudflare Worker entry point
  start.ts         # TanStack Start config with error middleware
```

## Getting started

### Prerequisites

- Node.js 20+
- A Cloudflare account (for D1 and deployment)
- An OpenAI API key

### Setup

```bash
npm install
```

### Database

Create a D1 database:

```bash
npx wrangler d1 create mcp-forge-db
```

Copy the returned `database_id` into `wrangler.jsonc` under `d1_databases[0].database_id`.

### Environment variables

Copy `.env.example` to `.env` and set your OpenAI key:

```bash
cp .env.example .env
# Edit .env with your OPENAI_API_KEY
```

### Run locally

```bash
npm run dev
```

Opens at `http://localhost:3000`. The Studio loads tools from D1 and generates via OpenAI.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests (Vitest) |
| `npm run lint` | Lint with Biome |
| `npm run format` | Format with Biome |
| `npm run check` | Lint + format check |
| `npm run deploy` | Build + deploy to Cloudflare Workers |

## Deployment

```bash
npm run deploy
```

For production secrets:

```bash
npx wrangler secret put OPENAI_API_KEY
```

## Architecture

Server functions (`src/server-fns/`) run on Cloudflare Workers via TanStack Start. They access D1 through the `DB` binding and call OpenAI through `src/lib/llm.ts`. The Studio frontend uses TanStack Query mutations to call these server functions, keeping the UI reactive without REST boilerplate.

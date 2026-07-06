import { getBinding } from "./env";

export function getDb(): D1Database {
	const db = getBinding<D1Database>("DB");
	if (!db) throw new Error("D1 binding 'DB' is not available");
	return db;
}

// ─── Migrations ─────────────────────────────────────────────────────────────

const MIGRATIONS = [
	{
		version: 1,
		statements: [
			"CREATE TABLE IF NOT EXISTS tools (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, summary TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '', category TEXT NOT NULL DEFAULT 'Custom', platforms TEXT NOT NULL DEFAULT '[]', complexity TEXT NOT NULL DEFAULT 'Low', accent TEXT NOT NULL DEFAULT 'ember', schema TEXT NOT NULL DEFAULT '{}', version TEXT NOT NULL DEFAULT '0.1.0', config TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
			"CREATE TABLE IF NOT EXISTS invocations (id TEXT PRIMARY KEY, tool_id TEXT NOT NULL, input TEXT NOT NULL DEFAULT '', output TEXT NOT NULL DEFAULT '', logs TEXT NOT NULL DEFAULT '[]', latency_ms INTEGER NOT NULL DEFAULT 0, success INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (tool_id) REFERENCES tools(id))",
			"CREATE INDEX IF NOT EXISTS idx_invocations_tool_id ON invocations(tool_id)",
		],
	},
];

export async function runMigrations() {
	const db = getDb();
	const { results: existing } = await db
		.prepare(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='migrations'",
		)
		.all<{ name: string }>();

	if (existing.length === 0) {
		await db.exec(
			"CREATE TABLE migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))",
		);
	}

	for (const m of MIGRATIONS) {
		const { results: applied } = await db
			.prepare("SELECT version FROM migrations WHERE version = ?")
			.bind(m.version)
			.all<{ version: number }>();

		if (applied.length === 0) {
			for (const sql of m.statements) {
				await db.exec(sql);
			}
			await db
				.prepare("INSERT INTO migrations (version) VALUES (?)")
				.bind(m.version)
				.run();
		}
	}
}

// ─── Tool queries ───────────────────────────────────────────────────────────

interface ToolRow {
	id: string;
	name: string;
	summary: string;
	description: string;
	category: string;
	platforms: string;
	complexity: string;
	accent: string;
	schema: string;
	version: string;
	config: string;
	created_at: string;
	updated_at: string;
}

function rowToTool(row: ToolRow) {
	return {
		id: row.id,
		name: row.name,
		summary: row.summary,
		description: row.description,
		category: row.category,
		platforms: JSON.parse(row.platforms) as string[],
		complexity: row.complexity,
		accent: row.accent,
		schema: row.schema,
		version: row.version,
		config: JSON.parse(row.config) as Record<string, unknown>,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

export async function getTools(): Promise<ReturnType<typeof rowToTool>[]> {
	const db = getDb();
	const { results } = await db
		.prepare("SELECT * FROM tools ORDER BY created_at DESC")
		.all<ToolRow>();
	return results.map(rowToTool);
}

export async function getToolById(id: string) {
	const db = getDb();
	const { results } = await db
		.prepare("SELECT * FROM tools WHERE id = ?")
		.bind(id)
		.all<ToolRow>();
	return results.length > 0 ? rowToTool(results[0]) : null;
}

export async function getToolByName(name: string) {
	const db = getDb();
	const { results } = await db
		.prepare("SELECT * FROM tools WHERE name = ?")
		.bind(name)
		.all<ToolRow>();
	return results.length > 0 ? rowToTool(results[0]) : null;
}

export async function createTool(input: {
	id: string;
	name: string;
	summary?: string;
	description?: string;
	category?: string;
	platforms?: string[];
	complexity?: string;
	accent?: string;
	schema?: string;
	version?: string;
	config?: Record<string, unknown>;
}) {
	const db = getDb();
	const now = new Date().toISOString();
	await db
		.prepare(`
    INSERT INTO tools (id, name, summary, description, category, platforms, complexity, accent, schema, version, config, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
		.bind(
			input.id,
			input.name,
			input.summary ?? "",
			input.description ?? "",
			input.category ?? "Custom",
			JSON.stringify(input.platforms ?? []),
			input.complexity ?? "Low",
			input.accent ?? "ember",
			input.schema ?? "{}",
			input.version ?? "0.1.0",
			JSON.stringify(input.config ?? {}),
			now,
			now,
		)
		.run();
	return getToolById(input.id);
}

export async function deleteTool(id: string) {
	const db = getDb();
	await db.prepare("DELETE FROM tools WHERE id = ?").bind(id).run();
}

import { z } from "zod";

// ─── Tool ───────────────────────────────────────────────────────────────────

export const ToolPlatform = z.enum(["Cursor", "VS Code", "MCP"]);
export type ToolPlatform = z.infer<typeof ToolPlatform>;

export const ToolCategory = z.enum([
	"Developer",
	"Data",
	"AI",
	"Productivity",
	"Custom",
]);
export type ToolCategory = z.infer<typeof ToolCategory>;

export const ToolComplexity = z.enum(["Low", "Medium", "High"]);
export type ToolComplexity = z.infer<typeof ToolComplexity>;

export const toolSchema = z.object({
	id: z.string(),
	name: z.string(),
	summary: z.string(),
	description: z.string().default(""),
	category: ToolCategory,
	platforms: z.array(ToolPlatform),
	complexity: ToolComplexity,
	accent: z.string().default("ember"),
	schema: z.string().default("{}"),
	version: z.string().default("0.1.0"),
	config: z.record(z.unknown()).default({}),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type Tool = z.infer<typeof toolSchema>;

export const createToolInput = toolSchema
	.omit({ id: true, createdAt: true, updatedAt: true })
	.partial({
		description: true,
		accent: true,
		version: true,
		schema: true,
		config: true,
	});
export type CreateToolInput = z.infer<typeof createToolInput>;

// ─── Generation ─────────────────────────────────────────────────────────────

export const generateInputSchema = z.object({
	prompt: z.string().min(1, "Prompt is required"),
	mode: z.enum(["prompt", "structured"]).default("prompt"),
	language: z
		.enum(["TypeScript", "JavaScript", "Python"])
		.default("TypeScript"),
	runtime: z.enum(["Node", "Serverless", "Edge"]).default("Node"),
	target: z.enum(["Cursor", "VS Code", "Universal MCP"]).default("Cursor"),
});
export type GenerateInput = z.infer<typeof generateInputSchema>;

export interface GeneratedTool {
	name: string;
	summary: string;
	description: string;
	category: ToolCategory;
	complexity: ToolComplexity;
	schema: string;
	serverCode: string;
	mcpConfig: string;
	readme: string;
	packageJson: string;
}

// ─── Sandbox / Invocation ───────────────────────────────────────────────────

export const invokeInputSchema = z.object({
	toolId: z.string(),
	input: z.string(),
});
export type InvokeInput = z.infer<typeof invokeInputSchema>;

export interface InvocationLog {
	line: string;
	timestamp: string;
}

export interface InvokeResult {
	logs: InvocationLog[];
	output: string;
	latencyMs: number;
	success: boolean;
}

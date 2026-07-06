import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createTool, runMigrations } from "#/lib/db";
import { callLlm, GENERATE_SYSTEM_PROMPT } from "#/lib/llm";

const generateTool = createServerFn({ method: "POST" })
	.validator(
		z.object({
			prompt: z.string().min(1),
			mode: z.enum(["prompt", "structured"]).default("prompt"),
			language: z
				.enum(["TypeScript", "JavaScript", "Python"])
				.default("TypeScript"),
			runtime: z.enum(["Node", "Serverless", "Edge"]).default("Node"),
			target: z.enum(["Cursor", "VS Code", "Universal MCP"]).default("Cursor"),
		}),
	)
	.handler(async ({ data }) => {
		try {
			const prompt =
				data.mode === "structured"
					? `Create an MCP tool with these specifications:\n${data.prompt}\n\nLanguage: ${data.language}\nRuntime: ${data.runtime}\nTarget: ${data.target}`
					: data.prompt;

			const raw = await callLlm(GENERATE_SYSTEM_PROMPT, prompt);
			const generated = JSON.parse(raw) as {
				name: string;
				summary: string;
				description: string;
				category: string;
				complexity: string;
				schema: Record<string, unknown>;
				serverCode: string;
				mcpConfig: string;
				readme: string;
				packageJson: string;
			};

			const id = `tool-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

			await runMigrations();
			const tool = await createTool({
				id,
				name: generated.name,
				summary: generated.summary,
				description: generated.description,
				category: generated.category,
				platforms: [targetMap(data.target)],
				complexity: generated.complexity,
				accent: accentMap(generated.category),
				schema: JSON.stringify(generated.schema),
				version: "0.1.0",
				config: {
					serverCode: generated.serverCode,
					mcpConfig: generated.mcpConfig,
					readme: generated.readme,
					packageJson: generated.packageJson,
					language: data.language,
					runtime: data.runtime,
					target: data.target,
				},
			});

			return { tool, generated: { ...generated, id } };
		} catch (error) {
			console.error("Generation failed:", error);
			const message =
				error instanceof Error ? error.message : "Generation failed";
			return { tool: null, error: message };
		}
	});

function targetMap(target: string): string {
	if (target === "Universal MCP") return "MCP";
	return target;
}

function accentMap(category: string): string {
	switch (category) {
		case "Data":
			return "plasma";
		case "AI":
			return "violet";
		case "Productivity":
			return "mint";
		default:
			return "ember";
	}
}

export { generateTool };

function getBaseUrl(): string {
	return process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
}

function getApiKey(): string {
	const key = process.env.OPENAI_API_KEY;
	if (!key) throw new Error("OPENAI_API_KEY is not set");
	return key;
}

function getModel(): string {
	return process.env.OPENAI_MODEL ?? "gpt-4o";
}

export async function callLlm(system: string, user: string): Promise<string> {
	const response = await fetch(`${getBaseUrl()}/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getApiKey()}`,
		},
		body: JSON.stringify({
			model: getModel(),
			messages: [
				{ role: "system", content: system },
				{ role: "user", content: user },
			],
			temperature: 0.3,
		}),
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`LLM request failed (${response.status}): ${body}`);
	}

	const data = (await response.json()) as {
		choices: { message: { content: string } }[];
	};
	return data.choices[0]?.message?.content ?? "";
}

export const GENERATE_SYSTEM_PROMPT = `You are an expert MCP (Model Context Protocol) tool generator.
Given a natural language description, generate a complete MCP tool definition.

You MUST respond with a valid JSON object (no markdown fences) with this exact shape:
{
  "name": "domain.action_name",
  "summary": "short one-line description",
  "description": "longer description",
  "category": "Developer | Data | AI | Productivity | Custom",
  "complexity": "Low | Medium | High",
  "schema": { ... JSON schema for the tool's input/output ... },
  "serverCode": "the full TypeScript server code using @modelcontextprotocol/sdk",
  "mcpConfig": "JSON config for the MCP server",
  "readme": "markdown README content",
  "packageJson": "JSON package.json content"
}

Generate valid, production-quality code. Use zod for input validation.
The serverCode should import { McpServer } from "@modelcontextprotocol/sdk" and z from "zod".`;

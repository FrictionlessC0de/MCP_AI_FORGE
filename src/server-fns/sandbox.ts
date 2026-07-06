import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getToolById } from "#/lib/db";
import { callLlm, GENERATE_SYSTEM_PROMPT } from "#/lib/llm";
import type { InvokeResult } from "#/lib/schemas";

const invokeTool = createServerFn({ method: "POST" })
	.validator(
		z.object({
			toolId: z.string(),
			input: z.string(),
		}),
	)
	.handler(async ({ data }) => {
		const tool = await getToolById(data.toolId);
		if (!tool) {
			return { result: null, error: "Tool not found" } as const;
		}

		const start = Date.now();

		try {
			const parsed = JSON.parse(data.input);

			const llmResult = await callLlm(
				`You are simulating the MCP tool "${tool.name}".
Schema: ${tool.schema}
Input: ${JSON.stringify(parsed)}

Respond with a JSON object with:
- "logs": array of log line strings (simulated execution steps)
- "output": the simulated tool output as a JSON string`,
				`Simulate running ${tool.name} with input: ${data.input}`,
			);

			const simulated = JSON.parse(llmResult) as {
				logs: string[];
				output: string;
			};
			const latencyMs = Date.now() - start;

			const result: InvokeResult = {
				logs: simulated.logs.map((line) => ({
					line,
					timestamp: new Date().toISOString(),
				})),
				output: simulated.output,
				latencyMs,
				success: true,
			};

			return { result, error: null } as const;
    } catch {
			// If input is invalid JSON or LLM call fails, return a basic simulation
			const latencyMs = Date.now() - start;
			const result: InvokeResult = {
				logs: [
					{
						line: `→ invoked ${tool.name}`,
						timestamp: new Date().toISOString(),
					},
				],
				output: `{"status": "simulated", "tool": "${tool.name}"}`,
				latencyMs,
				success: true,
			};
			return { result, error: null } as const;
		}
	});

export { invokeTool };

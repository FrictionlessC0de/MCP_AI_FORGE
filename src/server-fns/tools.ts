import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
	createTool,
	getTools as dbGetTools,
	deleteTool,
	getToolById,
	runMigrations,
} from "#/lib/db";

const listTools = createServerFn({ method: "GET" }).handler(async () => {
	try {
		await runMigrations();
		const tools = await dbGetTools();
		return { tools };
	} catch (error) {
		console.error("Failed to list tools:", error);
		return { tools: [], error: "Failed to load tools" };
	}
});

const getTool = createServerFn({ method: "GET" })
	.validator(z.string())
	.handler(async ({ data: id }) => {
		try {
			const tool = await getToolById(id);
			return { tool };
		} catch (error) {
			console.error("Failed to get tool:", error);
			return { tool: null, error: "Tool not found" };
		}
	});

const createToolFn = createServerFn({ method: "POST" })
	.validator(
		z.object({
			id: z.string(),
			name: z.string(),
			summary: z.string().optional(),
			description: z.string().optional(),
			category: z.string().optional(),
			platforms: z.array(z.string()).optional(),
			complexity: z.string().optional(),
			accent: z.string().optional(),
			schema: z.string().optional(),
			version: z.string().optional(),
		}),
	)
	.handler(async ({ data }) => {
		try {
			await runMigrations();
			const tool = await createTool(data);
			return { tool };
		} catch (error) {
			console.error("Failed to create tool:", error);
			return { tool: null, error: "Failed to create tool" };
		}
	});

const deleteToolFn = createServerFn({ method: "POST" })
	.validator(z.string())
	.handler(async ({ data: id }) => {
		try {
			await deleteTool(id);
			return { success: true };
		} catch (error) {
			console.error("Failed to delete tool:", error);
			return { success: false, error: "Failed to delete tool" };
		}
	});

export { listTools, getTool, createToolFn, deleteToolFn };

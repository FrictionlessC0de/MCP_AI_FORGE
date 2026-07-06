import { env } from "cloudflare:workers";

export function getBindings<T = Record<string, unknown>>(): T {
	return env as unknown as T;
}

export function getBinding<T>(name: string): T | undefined {
	return (env as Record<string, unknown>)?.[name] as T | undefined;
}

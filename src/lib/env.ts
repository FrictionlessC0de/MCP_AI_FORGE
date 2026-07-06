// Cloudflare bindings are passed through the fetch handler in server.ts.
// Since Workers handle one request at a time, a module-level store is safe.

let _env: Record<string, unknown> | null = null;

export function setBindings(env: Record<string, unknown>) {
	_env = env;
}

export function getBindings<T = Record<string, unknown>>(): T {
	return _env as T;
}

export function getBinding<T>(name: string): T | undefined {
	return _env?.[name] as T | undefined;
}

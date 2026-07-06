export function extractJson(raw: string): string {
	const cleaned = raw
		.replace(/```json\s*/gi, "")
		.replace(/```\s*$/gm, "")
		.trim();
	const start = cleaned.indexOf("{");
	const end = cleaned.lastIndexOf("}");
	if (start !== -1 && end !== -1) {
		return cleaned.slice(start, end + 1);
	}
	return cleaned;
}

export function sanitizeJson(raw: string): string {
	let result = "";
	let inString = false;
	let escaped = false;
	for (const ch of raw) {
		if (inString) {
			if (escaped) {
				escaped = false;
			} else if (ch === "\\") {
				escaped = true;
			} else if (ch === '"') {
				inString = false;
			} else if (ch === "\n") {
				result += "\\n";
				continue;
			} else if (ch === "\r") {
				result += "\\r";
				continue;
			} else if (ch === "\t") {
				result += "\\t";
				continue;
			}
		} else if (ch === '"') {
			inString = true;
		}
		result += ch;
	}
	return result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
}

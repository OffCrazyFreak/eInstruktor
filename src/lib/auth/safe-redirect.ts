function hasControlCharacter(path: string): boolean {
	return [...path].some((character) => {
		const code = character.charCodeAt(0);

		return code < 32 || code === 127;
	});
}

/** Returns the path when it stays on this site, or null; "//host", backslashes and control characters could leave it. */
export function safeRedirect(path: string | null | undefined): string | null {
	if (!path || !path.startsWith("/") || path.startsWith("//")) {
		return null;
	}

	if (path.includes("\\") || hasControlCharacter(path)) {
		return null;
	}

	return path;
}

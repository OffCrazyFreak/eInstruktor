// Canonical links and the sitemap use this fixed origin, never the request host, so previews cannot claim to be the real site.
export const SITE_ORIGIN = "https://einstruktor.netlify.app";

export const SITE_NAME = "eInstruktor";

export function absoluteUrl(path: string): string {
	return new URL(path, SITE_ORIGIN).href;
}

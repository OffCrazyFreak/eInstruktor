export function reveal(reduce: boolean, y = 26) {
	if (reduce) return {};
	return {
		initial: { opacity: 0, y },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, margin: "-80px" },
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
	};
}

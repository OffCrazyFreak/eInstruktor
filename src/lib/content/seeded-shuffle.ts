// mulberry32: tiny, fast and good enough to shuffle questions; the same seed always gives the same order.
function createRandom(seed: number): () => number {
	let state = seed >>> 0;

	return function next() {
		state = (state + 0x6d2b79f5) >>> 0;

		let mixed = state;
		mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
		mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);

		return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
	};
}

export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
	const random = createRandom(seed);
	const shuffled = [...items];

	for (let index = shuffled.length - 1; index > 0; index--) {
		const swapIndex = Math.floor(random() * (index + 1));
		const current = shuffled[index] as T;

		shuffled[index] = shuffled[swapIndex] as T;
		shuffled[swapIndex] = current;
	}

	return shuffled;
}

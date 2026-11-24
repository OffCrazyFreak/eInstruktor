/** A fresh 32-bit seed for a shuffle; crypto when the browser has it, so two sessions never share a draw. */
export default function randomSeed(): number {
	const values = new Uint32Array(1);

	if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
		crypto.getRandomValues(values);

		return values[0] ?? 0;
	}

	return Math.floor(Math.random() * 2 ** 32);
}

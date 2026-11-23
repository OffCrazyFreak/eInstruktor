/** Croatian count forms: 1 lekcija, 2 lekcije, 5 lekcija; 11 to 14 take the third form. */
export function pluralHr(
	count: number,
	one: string,
	few: string,
	many: string,
): string {
	const lastTwo = Math.abs(count) % 100;
	const last = lastTwo % 10;

	if (last === 1 && lastTwo !== 11) {
		return one;
	}

	if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) {
		return few;
	}

	return many;
}

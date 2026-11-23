/** Free-form props a lesson block or question passes to a visual, as typed in `src/content/types.ts`. */
export type VisualProps = Record<string, string | number | boolean | string[]>;

/** Returns the value when it is one of `options`, so unknown or misspelled content values are ignored. */
export function readOption<T extends string>(
	props: VisualProps | undefined,
	key: string,
	options: readonly T[],
): T | undefined {
	const value = props?.[key];

	if (typeof value !== "string") {
		return undefined;
	}

	return options.find((option) => option === value);
}

export interface INumberRange {
	min: number;
	max: number;
	/** Rounds to this step, so the value lands on a position the slider can show. */
	step?: number;
}

/** Reads a number or numeric string, clamped and rounded to the range of the control that shows it. */
export function readNumber(
	props: VisualProps | undefined,
	key: string,
	range: INumberRange,
): number | undefined {
	const value = props?.[key];
	const parsed =
		typeof value === "string" && value.trim() !== "" ? Number(value) : value;

	if (typeof parsed !== "number" || !Number.isFinite(parsed)) {
		return undefined;
	}

	const step = range.step ?? 1;
	const stepped = Math.round(parsed / step) * step;

	return Math.min(range.max, Math.max(range.min, stepped));
}

export function readBoolean(
	props: VisualProps | undefined,
	key: string,
): boolean {
	const value = props?.[key];

	return value === true || value === "true";
}

export function readString(
	props: VisualProps | undefined,
	key: string,
): string | undefined {
	const value = props?.[key];

	return typeof value === "string" && value.trim() !== ""
		? value.trim()
		: undefined;
}

/** Keeps only the known values of a list prop, in the order the content gave them. */
export function readOptionList<T extends string>(
	props: VisualProps | undefined,
	key: string,
	options: readonly T[],
): T[] {
	const value = props?.[key];

	if (!Array.isArray(value)) {
		return [];
	}

	return value.flatMap((item) => {
		const match = options.find((option) => option === item);

		return match ? [match] : [];
	});
}

export function readStringList(
	props: VisualProps | undefined,
	key: string,
): string[] {
	const value = props?.[key];

	if (!Array.isArray(value)) {
		return [];
	}

	return value
		.filter((item): item is string => typeof item === "string")
		.map((item) => item.trim())
		.filter((item) => item !== "");
}

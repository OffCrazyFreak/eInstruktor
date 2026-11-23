import {
	coverage,
	type IQuestionGroup,
	recentAccuracy,
} from "@/lib/progress/accuracy";
import type { IAttempt } from "@/lib/progress/progress-schema";

// Owner-approved thresholds (UX research section 7): a margin above the 75 percent mock pass rule, tuned once real data exists.
export const READY_ACCURACY = 0.85;

export const READY_COVERAGE = 0.8;

export const ON_TRACK_ACCURACY = 0.7;

export const MIN_ANSWERS = 10;

/** Ordered from weakest to strongest. */
export const READINESS_LABELS = [
	"premalo-podataka",
	"za-pocetak",
	"na-dobrom-putu",
	"spreman",
] as const;

export type ReadinessLabel = (typeof READINESS_LABELS)[number];

export interface ISubjectReadiness {
	id: string;
	answered: number;
	accuracy: number | null;
	coverage: number;
	label: ReadinessLabel;
}

export interface IReadiness {
	subjects: ISubjectReadiness[];
	/** The weakest measured subject; the pass rule is per subject, so it is the overall answer. Null while no subject has enough answers. */
	weakest: ISubjectReadiness | null;
	overall: ReadinessLabel;
}

function labelFor(
	answered: number,
	accuracy: number | null,
	covered: number,
): ReadinessLabel {
	if (answered < MIN_ANSWERS || accuracy === null) {
		return "premalo-podataka";
	}

	if (accuracy >= READY_ACCURACY && covered >= READY_COVERAGE) {
		return "spreman";
	}

	return accuracy >= ON_TRACK_ACCURACY ? "na-dobrom-putu" : "za-pocetak";
}

function rank(subject: ISubjectReadiness): [number, number] {
	return [READINESS_LABELS.indexOf(subject.label), subject.accuracy ?? 0];
}

function isWeaker(first: ISubjectReadiness, second: ISubjectReadiness) {
	const [firstLabel, firstAccuracy] = rank(first);
	const [secondLabel, secondAccuracy] = rank(second);

	return firstLabel === secondLabel
		? firstAccuracy < secondAccuracy
		: firstLabel < secondLabel;
}

export function readiness(
	subjects: readonly IQuestionGroup[],
	attempts: readonly IAttempt[],
): IReadiness {
	const perSubject = subjects.map((subject) => {
		const { answered, accuracy } = recentAccuracy(
			attempts,
			subject.questionIds,
		);
		const covered = coverage(attempts, subject.questionIds);

		return {
			id: subject.id,
			answered,
			accuracy,
			coverage: covered,
			label: labelFor(answered, accuracy, covered),
		};
	});

	// A subject without enough answers says nothing yet, so it must not hide a measured subject that is failing.
	const weakest = perSubject
		.filter((subject) => subject.label !== "premalo-podataka")
		.reduce<ISubjectReadiness | null>(
			(current, subject) =>
				current === null || isWeaker(subject, current) ? subject : current,
			null,
		);

	return {
		subjects: perSubject,
		weakest,
		overall: weakest?.label ?? "premalo-podataka",
	};
}

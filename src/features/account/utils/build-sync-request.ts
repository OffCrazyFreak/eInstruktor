import {
	emptyBaseline,
	type ISyncBaseline,
} from "@/features/account/utils/sync-baseline";
import type {
	ISyncExamSession,
	ISyncProfile,
	ISyncRequest,
} from "@/features/account/utils/sync-schema";
import type {
	IExamSession,
	IProgressState,
} from "@/lib/progress/progress-schema";

const PROFILE_FIELDS = ["targetLevel", "examDate", "passedAt"] as const;

export function localProfile(progress: IProgressState): ISyncProfile {
	return {
		targetLevel: progress.targetLevel,
		examDate: progress.examDate,
		passedAt: progress.passedAt,
	};
}

function toSyncExamSession(session: IExamSession): ISyncExamSession | null {
	if (
		session.finishedAt === null ||
		session.score === null ||
		session.passed === null
	) {
		return null;
	}

	return {
		id: session.id,
		level: session.level,
		seed: session.seed,
		questionIds: session.questionIds,
		startedAt: session.startedAt,
		finishedAt: session.finishedAt,
		endsAt: session.endsAt ?? null,
		score: session.score,
		passed: session.passed,
		perSubject: session.perSubject ?? {},
		answers: session.answers ?? {},
		graded: session.graded ?? {},
	};
}

function addedEntries(
	record: Record<string, number>,
	known: ReadonlySet<string>,
): Record<string, number> {
	return Object.fromEntries(
		Object.entries(record).filter(([key]) => !known.has(key)),
	);
}

function removedKeys(record: Record<string, number>, known: readonly string[]) {
	return known.filter((key) => record[key] === undefined);
}

function changedProfile(
	current: ISyncProfile,
	synced: ISyncProfile,
): Partial<ISyncProfile> {
	return Object.fromEntries(
		PROFILE_FIELDS.filter((field) => current[field] !== synced[field]).map(
			(field) => [field, current[field]],
		),
	);
}

/** Everything this browser changed since the account last confirmed its state; a new account gets all of it. */
export function buildSyncRequest(
	progress: IProgressState,
	stored: ISyncBaseline | null,
	userId: string,
	full: boolean,
): ISyncRequest {
	const known = stored?.userId === userId ? stored : null;
	const base = known ?? emptyBaseline(userId);
	const syncedExams = new Set(base.examSessionIds);
	const syncedDays = new Set(base.studyDays);
	const syncedBadges = new Set(base.badges);

	return {
		full,
		// Strictly newer: answers saved together, such as a handed-in exam, share one time and are always sent together.
		attempts: known
			? progress.attempts.filter(
					(attempt) => attempt.answeredAt > base.attemptsThrough,
				)
			: progress.attempts,
		examSessions: progress.examSessions
			.filter((session) => !syncedExams.has(session.id))
			.flatMap((session) => toSyncExamSession(session) ?? []),
		lessonsAdded: addedEntries(progress.lessonsDone, new Set(base.lessons)),
		lessonsRemoved: removedKeys(progress.lessonsDone, base.lessons),
		flaggedAdded: addedEntries(progress.flagged, new Set(base.flagged)),
		flaggedRemoved: removedKeys(progress.flagged, base.flagged),
		studyDays: progress.studyDays.filter((day) => !syncedDays.has(day)),
		badges: addedEntries(progress.badges, syncedBadges),
		profile: known
			? {
					mode: "set",
					values: changedProfile(localProfile(progress), base.profile),
				}
			: { mode: "fill", values: localProfile(progress) },
	};
}

export function hasLocalChanges(request: ISyncRequest): boolean {
	return (
		request.attempts.length > 0 ||
		request.examSessions.length > 0 ||
		Object.keys(request.lessonsAdded).length > 0 ||
		request.lessonsRemoved.length > 0 ||
		Object.keys(request.flaggedAdded).length > 0 ||
		request.flaggedRemoved.length > 0 ||
		request.studyDays.length > 0 ||
		Object.keys(request.badges).length > 0 ||
		Object.keys(request.profile.values).length > 0
	);
}

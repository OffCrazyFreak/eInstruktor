import type { ISyncBaseline } from "@/features/account/utils/sync-baseline";
import type {
	ISyncAttempt,
	ISyncExamSession,
	ISyncRequest,
	ISyncResponse,
} from "@/features/account/utils/sync-schema";
import { toStudyDay } from "@/lib/dates/study-day";
import { MAX_STORED_EXAM_SESSIONS } from "@/lib/progress/exam-session-actions";
import { nextLeitnerEntry } from "@/lib/progress/leitner";
import { MAX_STORED_ATTEMPTS } from "@/lib/progress/progress-actions";
import type {
	IAttempt,
	IExamSession,
	ILeitnerEntry,
	IProgressState,
} from "@/lib/progress/progress-schema";

export interface ISyncExchange {
	/** The local state the request was built from. */
	sent: IProgressState;
	request: ISyncRequest;
	response: ISyncResponse;
	userId: string;
	/** The baseline before this sync, when it belongs to the same user. */
	previous: ISyncBaseline | null;
}

export interface ISyncResult {
	progress: IProgressState;
	baseline: ISyncBaseline;
}

const MAX_BASELINE_EXAM_IDS = MAX_STORED_EXAM_SESSIONS * 2;

// The account is the truth, except for what this device changed while the request was on its way.
function mergeRecord(
	server: Record<string, number>,
	sent: Record<string, number>,
	now: Record<string, number>,
): Record<string, number> {
	const result = { ...server };

	for (const [key, value] of Object.entries(now)) {
		if (sent[key] === undefined) {
			result[key] = Math.min(result[key] ?? value, value);
		}
	}

	for (const key of Object.keys(sent)) {
		if (now[key] === undefined) {
			delete result[key];
		}
	}

	return result;
}

function unionRecord(
	first: Record<string, number>,
	second: Record<string, number>,
): Record<string, number> {
	const result = { ...first };

	for (const [key, value] of Object.entries(second)) {
		result[key] = Math.min(result[key] ?? value, value);
	}

	return result;
}

function mergeAttempts(local: IAttempt[], pulled: ISyncAttempt[]): IAttempt[] {
	const known = new Set(local.map((attempt) => attempt.id));
	const fresh = pulled.filter((attempt) => !known.has(attempt.id));

	return [...local, ...fresh]
		.sort((first, second) => first.answeredAt - second.answeredAt)
		.slice(-MAX_STORED_ATTEMPTS);
}

// A session on this device may carry more, such as exam flags, so the local copy wins.
function mergeExamSessions(
	local: IExamSession[],
	pulled: ISyncExamSession[],
): IExamSession[] {
	const known = new Set(local.map((session) => session.id));
	const fresh = pulled
		.filter((session) => !known.has(session.id))
		.map((session) => ({ ...session, flaggedIds: [] }));

	return [...local, ...fresh]
		.sort((first, second) => first.startedAt - second.startedAt)
		.slice(-MAX_STORED_EXAM_SESSIONS);
}

// A new device gets review boxes rebuilt from the pulled answers, so "Za ponoviti" is not empty there.
function rebuildMissingBoxes(
	boxes: Record<string, ILeitnerEntry>,
	attempts: IAttempt[],
): Record<string, ILeitnerEntry> {
	const rebuilt: Record<string, ILeitnerEntry> = {};

	for (const attempt of attempts) {
		if (attempt.mode === "exam" || boxes[attempt.questionId]) {
			continue;
		}

		rebuilt[attempt.questionId] = nextLeitnerEntry(
			rebuilt[attempt.questionId],
			attempt.correct,
			toStudyDay(new Date(attempt.answeredAt)),
		);
	}

	return { ...boxes, ...rebuilt };
}

function latestTime(times: number[]): number {
	return times.reduce((latest, time) => Math.max(latest, time), 0);
}

/** Adopts the account state into the current local state and records what the account now holds. */
export function applySyncResponse(
	now: IProgressState,
	{ sent, request, response, userId, previous }: ISyncExchange,
): ISyncResult {
	const profile = response.profile;

	const attempts = response.attempts
		? mergeAttempts(now.attempts, response.attempts)
		: now.attempts;

	const progress: IProgressState = {
		...now,
		targetLevel:
			now.targetLevel === sent.targetLevel
				? (profile.targetLevel ?? now.targetLevel)
				: now.targetLevel,
		examDate: now.examDate === sent.examDate ? profile.examDate : now.examDate,
		passedAt: now.passedAt === sent.passedAt ? profile.passedAt : now.passedAt,
		lessonsDone: mergeRecord(
			response.lessonsDone,
			sent.lessonsDone,
			now.lessonsDone,
		),
		flagged: mergeRecord(response.flagged, sent.flagged, now.flagged),
		studyDays: [...new Set([...response.studyDays, ...now.studyDays])].sort(),
		badges: unionRecord(response.badges, now.badges),
		attempts,
		questionBoxes: response.attempts
			? rebuildMissingBoxes(now.questionBoxes, attempts)
			: now.questionBoxes,
		examSessions: response.examSessions
			? mergeExamSessions(now.examSessions, response.examSessions)
			: now.examSessions,
	};

	const baseline: ISyncBaseline = {
		userId,
		// Every attempt in the sent state is on the account now; pulled times come from other clocks, so they never move this mark.
		// Capped at the present: one answer stamped by a clock that ran ahead must not hide every later answer from sync.
		attemptsThrough: Math.min(
			latestTime([
				previous?.attemptsThrough ?? 0,
				...sent.attempts.map((attempt) => attempt.answeredAt),
			]),
			Date.now(),
		),
		examSessionIds: [
			...new Set([
				...(previous?.examSessionIds ?? []),
				...request.examSessions.map((session) => session.id),
				...(response.examSessions ?? []).map((session) => session.id),
			]),
		].slice(-MAX_BASELINE_EXAM_IDS),
		lessons: Object.keys(response.lessonsDone),
		flagged: Object.keys(response.flagged),
		studyDays: response.studyDays,
		badges: Object.keys(response.badges),
		profile,
	};

	return { progress, baseline };
}

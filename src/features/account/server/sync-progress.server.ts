import type { AppDatabase } from "@/db/types";
import { mergeProfile } from "@/features/account/server/merge-profile.server";
import { pushProgress } from "@/features/account/server/push-progress.server";
import {
	readAttempts,
	readExamSessions,
	readProgressSets,
} from "@/features/account/server/read-progress.server";
import type {
	ISyncRequest,
	ISyncResponse,
} from "@/features/account/utils/sync-schema";

/** Merges one device's changes into the account and returns the account's state for the device to adopt. */
export async function syncProgressForUser(
	db: AppDatabase,
	userId: string,
	request: ISyncRequest,
): Promise<ISyncResponse> {
	const insertedAttempts = await pushProgress(db, userId, request);
	const profile = await mergeProfile(db, userId, request.profile);
	const sets = await readProgressSets(db, userId);

	const [attempts, examSessions] = request.full
		? await Promise.all([
				readAttempts(db, userId),
				readExamSessions(db, userId),
			])
		: [null, null];

	return { ...sets, profile, attempts, examSessions, insertedAttempts };
}

import { eq } from "drizzle-orm";
import { userProfile } from "@/db/schema";
import type { AppDatabase } from "@/db/types";
import type {
	ISyncProfile,
	ISyncRequest,
} from "@/features/account/utils/sync-schema";

const PROFILE_FIELDS = ["targetLevel", "examDate", "passedAt"] as const;

/** "fill": the account keeps what it has and local values fill its blanks; "set": the sent fields are the learner's new choice. */
export function mergeProfileValues(
	current: ISyncProfile,
	{ mode, values }: ISyncRequest["profile"],
): ISyncProfile {
	const next = { ...current };

	for (const field of PROFILE_FIELDS) {
		const incoming = values[field];

		if (incoming === undefined) {
			continue;
		}

		if (mode === "set" || current[field] === null) {
			Object.assign(next, { [field]: incoming });
		}
	}

	return next;
}

export async function mergeProfile(
	db: AppDatabase,
	userId: string,
	request: ISyncRequest["profile"],
): Promise<ISyncProfile> {
	const [row] = await db
		.select()
		.from(userProfile)
		.where(eq(userProfile.userId, userId))
		.limit(1);

	const current: ISyncProfile = {
		targetLevel: row?.targetLevel ?? null,
		examDate: row?.examDate ?? null,
		passedAt: row?.passedAt?.getTime() ?? null,
	};

	const next = mergeProfileValues(current, request);

	const unchanged =
		row !== undefined &&
		PROFILE_FIELDS.every((field) => next[field] === current[field]);

	if (unchanged) {
		return current;
	}

	const values = {
		targetLevel: next.targetLevel,
		examDate: next.examDate,
		passedAt: next.passedAt === null ? null : new Date(next.passedAt),
	};

	await db
		.insert(userProfile)
		.values({ userId, ...values })
		.onConflictDoUpdate({ target: userProfile.userId, set: values });

	return next;
}

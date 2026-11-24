import { eq, inArray, or } from "drizzle-orm";
import { account, session, user, userProfile, verification } from "@/db/schema";
import type { AppDatabase } from "@/db/types";
import randomId from "@/lib/random-id";

export const DELETED_USER_NAME = "Obrisani korisnik";

// RFC 2606 reserves .invalid, so the placeholder can never receive mail; the random part keeps the unique email index happy.
export function deletedEmailPlaceholder(): string {
	return `obrisan-${randomId()}@deleted.invalid`;
}

/**
 * Removes everything that names the learner: the Google link and tokens (account), every session, pending verification
 * values and the profile; the user row stays with its name, email and image replaced, so the anonymous answers keep a
 * valid owner. Runs as one batch, so a failure leaves nothing half deleted.
 */
export async function deleteAccountData(
	db: AppDatabase,
	userId: string,
): Promise<void> {
	const [row] = await db
		.select({ email: user.email })
		.from(user)
		.where(eq(user.id, userId))
		.limit(1);

	if (!row) {
		return;
	}

	await db.batch([
		db.delete(account).where(eq(account.userId, userId)),
		db.delete(session).where(eq(session.userId, userId)),
		db
			.delete(verification)
			.where(
				or(
					inArray(verification.identifier, [row.email, userId]),
					eq(verification.value, userId),
				),
			),
		db.delete(userProfile).where(eq(userProfile.userId, userId)),
		db
			.update(user)
			.set({
				name: DELETED_USER_NAME,
				email: deletedEmailPlaceholder(),
				emailVerified: false,
				image: null,
				updatedAt: new Date(),
			})
			.where(eq(user.id, userId)),
	]);
}

import { eq } from "drizzle-orm";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	account,
	questionAttempt,
	session,
	studyDay,
	user,
	userProfile,
	verification,
} from "@/db/schema";
import type { AppDatabase } from "@/db/types";
import {
	DELETED_USER_NAME,
	deleteAccountData,
} from "@/features/account/server/delete-account.server";
import { syncProgressForUser } from "@/features/account/server/sync-progress.server";
import {
	createTempDatabase,
	type ITempDatabase,
	insertTestUser,
} from "@/lib/testing/temp-database";
import { testAttempt } from "@/lib/testing/test-attempts";

// These tests use short made-up ids; the real course ids are covered in push-limits.server.test.ts.
vi.mock("@/features/account/server/known-content.server", () => ({
	KNOWN_QUESTION_IDS: { has: () => true },
	KNOWN_LESSON_SLUGS: { has: () => true },
}));

const NOW = new Date("2026-11-20T10:00:00Z");

let temp: ITempDatabase;
let db: AppDatabase;

async function signInRows(userId: string) {
	await db.insert(account).values({
		id: `account-${userId}`,
		accountId: `google-${userId}`,
		providerId: "google",
		userId,
		accessToken: "access",
		refreshToken: "refresh",
		idToken: "id-token",
		createdAt: NOW,
		updatedAt: NOW,
	});

	await db.insert(session).values(
		["one", "two"].map((device) => ({
			id: `session-${userId}-${device}`,
			token: `token-${userId}-${device}`,
			userId,
			expiresAt: NOW,
			createdAt: NOW,
			updatedAt: NOW,
			ipAddress: "203.0.113.7",
		})),
	);

	await db.insert(verification).values({
		id: `verification-${userId}`,
		identifier: `${userId}@example.com`,
		value: "pending",
		expiresAt: NOW,
	});
}

beforeEach(async () => {
	temp = await createTempDatabase();
	db = temp.db;

	for (const id of ["u1", "u2"]) {
		await insertTestUser(db, id);
		await signInRows(id);
		await syncProgressForUser(db, id, {
			full: false,
			attempts: [testAttempt({ id: `attempt-${id}` })],
			examSessions: [],
			lessonsAdded: {},
			lessonsRemoved: [],
			flaggedAdded: {},
			flaggedRemoved: [],
			studyDays: ["2026-11-20"],
			badges: {},
			profile: { mode: "fill", values: { targetLevel: "B" } },
		});
	}
});

afterEach(() => temp.cleanup());

describe("deleteAccountData", () => {
	it("removes the Google link, every session and pending verifications", async () => {
		await deleteAccountData(db, "u1");

		expect(
			await db.select().from(account).where(eq(account.userId, "u1")),
		).toEqual([]);
		expect(
			await db.select().from(session).where(eq(session.userId, "u1")),
		).toEqual([]);
		expect(
			await db
				.select()
				.from(verification)
				.where(eq(verification.identifier, "u1@example.com")),
		).toEqual([]);
	});

	it("replaces the name, email and image for good", async () => {
		await deleteAccountData(db, "u1");

		const [row] = await db.select().from(user).where(eq(user.id, "u1"));

		expect(row?.name).toBe(DELETED_USER_NAME);
		expect(row?.image).toBeNull();
		expect(row?.email).toMatch(/^obrisan-.+@deleted\.invalid$/);
		expect(JSON.stringify(row)).not.toContain("u1@example.com");
		expect(
			await db.select().from(userProfile).where(eq(userProfile.userId, "u1")),
		).toEqual([]);
	});

	it("keeps the anonymous usage rows", async () => {
		await deleteAccountData(db, "u1");

		expect(
			await db
				.select()
				.from(questionAttempt)
				.where(eq(questionAttempt.userId, "u1")),
		).toHaveLength(1);
		expect(
			await db.select().from(studyDay).where(eq(studyDay.userId, "u1")),
		).toHaveLength(1);
	});

	it("leaves every other learner alone", async () => {
		await deleteAccountData(db, "u1");

		const [other] = await db.select().from(user).where(eq(user.id, "u2"));

		expect(other?.email).toBe("u2@example.com");
		expect(
			await db.select().from(session).where(eq(session.userId, "u2")),
		).toHaveLength(2);
		expect(
			await db.select().from(account).where(eq(account.userId, "u2")),
		).toHaveLength(1);
	});

	it("gives each deleted account its own placeholder email", async () => {
		await deleteAccountData(db, "u1");
		await deleteAccountData(db, "u2");

		const emails = (await db.select().from(user)).map((row) => row.email);

		expect(new Set(emails).size).toBe(2);
	});
});

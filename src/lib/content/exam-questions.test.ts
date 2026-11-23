import { describe, expect, it } from "vitest";
import course from "@/content/voditelj-brodice";
import { questionsForExam } from "@/lib/content/exam-questions";

const subjectOf = new Map(
	course.areas.map((area) => [area.slug, area.subject]),
);

describe("questionsForExam", () => {
	it("draws the A exam from common and A questions only", () => {
		const questions = questionsForExam(course, "A", 1);

		expect(questions).toHaveLength(course.examFormats.A.questions);
		expect(questions.every((q) => q.level !== "B")).toBe(true);
		expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
	});

	it("draws the same number of B questions from each subject", () => {
		const questions = questionsForExam(course, "B", 1);
		const perSubject = new Map<string, number>();

		for (const question of questions) {
			const subject = subjectOf.get(question.area) ?? "";
			perSubject.set(subject, (perSubject.get(subject) ?? 0) + 1);
		}

		expect(perSubject.size).toBe(5);
		expect([...perSubject.values()]).toEqual(
			Array(5).fill(course.examFormats.B.questionsPerSubject),
		);
		expect(questions.every((q) => q.level !== "A")).toBe(true);
	});

	it("repeats the same exam for the same seed", () => {
		const ids = (seed: number) =>
			questionsForExam(course, "B", seed).map((q) => q.id);

		expect(ids(99)).toEqual(ids(99));
		expect(ids(99)).not.toEqual(ids(100));
	});
});

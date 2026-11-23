import { fireEvent, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import QuestionView from "@/components/custom/question/question-view";
import type { IQuestion } from "@/content/types";
import { renderWithRouter } from "@/lib/testing/render-with-router";

vi.mock("@/components/custom/visuals/visual-frame", () => ({
	default: ({
		visual,
		hideAnswer,
	}: {
		visual: string;
		hideAnswer?: boolean;
	}) => (
		<div
			data-testid="visual"
			data-visual={visual}
			data-hide-answer={String(Boolean(hideAnswer))}
		/>
	),
}));

const single: IQuestion = {
	id: "plovne-oznake-999",
	area: "plovne-oznake",
	lesson: "lateralne-oznake",
	level: "common",
	type: "single",
	prompt: "S koje strane ostavljaš crvenu plutaču pri uplovljavanju?",
	media: { visual: "iala-buoy-explorer", props: { mark: "port" } },
	options: [
		{ id: "a", text: "S lijeve strane", correct: true },
		{ id: "b", text: "S desne strane", correct: false },
	],
	explanation: "U regiji A crvena je lijevo pri uplovljavanju.",
	ruleRef: "IALA regija A",
	difficulty: 1,
	source: "original",
};

const multi: IQuestion = {
	...single,
	id: "plovne-oznake-998",
	type: "multi",
	media: undefined,
	options: [
		{ id: "a", text: "Prvo", correct: true },
		{ id: "b", text: "Drugo", correct: true },
		{ id: "c", text: "Treće", correct: false },
	],
};

function Harness({
	question,
	showLessonLink,
}: {
	question: IQuestion;
	showLessonLink?: boolean;
}) {
	const [selected, setSelected] = useState<string[]>([]);
	const [revealed, setRevealed] = useState(false);

	return (
		<>
			<QuestionView
				question={question}
				selected={selected}
				onSelectedChange={setSelected}
				revealed={revealed}
				showLessonLink={showLessonLink}
			/>
			<button type="button" onClick={() => setRevealed(true)}>
				Provjeri
			</button>
		</>
	);
}

describe("QuestionView", () => {
	it("offers single answers as a radio group named by the prompt", async () => {
		await renderWithRouter(() => <Harness question={single} />);

		const group = screen.getByRole("radiogroup", { name: single.prompt });

		expect(group).toBeTruthy();
		expect(screen.getAllByRole("radio")).toHaveLength(2);
	});

	it("offers multi answers as checkboxes", async () => {
		await renderWithRouter(() => <Harness question={multi} />);

		expect(screen.getAllByRole("checkbox")).toHaveLength(3);

		fireEvent.click(screen.getByRole("checkbox", { name: /Prvo/ }));
		fireEvent.click(screen.getByRole("checkbox", { name: /Drugo/ }));

		expect(
			screen
				.getAllByRole("checkbox")
				.filter((box) => (box as HTMLInputElement).checked),
		).toHaveLength(2);
	});

	it("hides the answer in its visual until the learner checks", async () => {
		await renderWithRouter(() => <Harness question={single} />);

		expect(screen.getByTestId("visual").dataset.hideAnswer).toBe("true");

		fireEvent.click(screen.getByRole("radio", { name: /S desne strane/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));

		expect(screen.getByTestId("visual").dataset.hideAnswer).toBe("false");
	});

	it("shows a wrong answer, the right one, the explanation, the rule and the lesson link", async () => {
		await renderWithRouter(() => <Harness question={single} />);

		fireEvent.click(screen.getByRole("radio", { name: /S desne strane/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));

		expect(screen.getByText("Netočno")).toBeTruthy();
		expect(screen.getByText("Tvoj odgovor, netočno")).toBeTruthy();
		expect(screen.getByText("Točan odgovor")).toBeTruthy();
		expect(screen.getByText(single.explanation)).toBeTruthy();
		expect(screen.getByText("IALA regija A")).toBeTruthy();
		expect(
			screen
				.getByRole("link", { name: /Pročitaj lekciju/ })
				.getAttribute("href"),
		).toBe("/ucenje/plovne-oznake/lateralne-oznake");
		expect(
			screen
				.getAllByRole("radio")
				.every((radio) => (radio as HTMLInputElement).disabled),
		).toBe(true);
	});

	it("confirms a right answer and moves focus to the feedback", async () => {
		await renderWithRouter(() => (
			<Harness question={single} showLessonLink={false} />
		));

		fireEvent.click(screen.getByRole("radio", { name: /S lijeve strane/ }));
		fireEvent.click(screen.getByRole("button", { name: "Provjeri" }));

		const verdict = screen.getByText("Točno");

		expect(verdict).toBeTruthy();
		expect(document.activeElement?.contains(verdict)).toBe(true);
		expect(screen.queryByRole("link", { name: /Pročitaj lekciju/ })).toBeNull();
	});

	it("does not move focus when the question is already answered on first render", async () => {
		await renderWithRouter(() => (
			<QuestionView
				question={single}
				selected={["a"]}
				onSelectedChange={() => {}}
				revealed
			/>
		));

		expect(screen.getByText("Točno")).toBeTruthy();
		expect(document.activeElement).toBe(document.body);
	});
});

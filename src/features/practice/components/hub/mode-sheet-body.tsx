import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import type { ExamLevel } from "@/content/course-types";
import type { AreaSlug } from "@/content/types";
import course from "@/content/voditelj-brodice";
import AreaChoiceList from "@/features/practice/components/hub/area-choice-list";
import ChoiceChips from "@/features/practice/components/hub/choice-chips";
import { PRACTICE_MODE_INFO } from "@/features/practice/constants/practice-modes";
import {
	type IPracticeContext,
	modeQuestionIds,
} from "@/features/practice/utils/practice-pool";
import type {
	PracticeMode,
	SessionLength,
} from "@/features/practice/utils/practice-search";
import { pluralHr } from "@/lib/plural";

interface IModeSheetBodyProps {
	mode: PracticeMode;
	learnerLevel: ExamLevel;
	context: IPracticeContext;
}

export default function ModeSheetBody({
	mode,
	learnerLevel,
	context,
}: IModeSheetBodyProps) {
	const info = PRACTICE_MODE_INFO[mode];
	const switchId = useId();
	const [area, setArea] = useState<AreaSlug | undefined>(undefined);
	const [length, setLength] = useState<SessionLength>(10);
	const [level, setLevel] = useState<ExamLevel>(learnerLevel);
	const [endFeedback, setEndFeedback] = useState(false);

	const needsArea = mode === "podrucje";
	const available = modeQuestionIds(course, { mode, level, area }, context);
	const count =
		length === "sve" ? available.length : Math.min(length, available.length);

	const areaChoices = course.areas.map((candidate) => ({
		area: candidate,
		count: modeQuestionIds(
			course,
			{ mode, level, area: candidate.slug },
			context,
		).length,
	}));

	const canStart = count > 0 && (!needsArea || area !== undefined);

	return (
		<>
			<SheetTitle className="pr-10 font-serif text-xl">{info.title}</SheetTitle>
			<SheetDescription className="mt-1">{info.description}</SheetDescription>

			<div className="mt-5 space-y-5">
				{needsArea && (
					<AreaChoiceList
						choices={areaChoices}
						value={area}
						onChange={setArea}
					/>
				)}

				<ChoiceChips
					name="practice-length"
					legend="Koliko pitanja"
					value={length}
					onChange={setLength}
					choices={[
						{ value: 10, label: "10" },
						{ value: 20, label: "20" },
						{ value: "sve", label: `Sva (${available.length})` },
					]}
				/>

				{learnerLevel === "B" ? (
					<ChoiceChips
						name="practice-level"
						legend="Pitanja za"
						value={level}
						onChange={setLevel}
						choices={[
							{ value: "B", label: "Kategoriju B" },
							{ value: "A", label: "Samo A" },
						]}
					/>
				) : (
					<p className="text-[0.9rem] text-muted-foreground">
						Učiš za kategoriju A, pa dobivaš samo pitanja za A.
					</p>
				)}

				<div className="flex items-start justify-between gap-4 rounded-2xl border border-border p-4">
					<label htmlFor={switchId} className="min-w-0 cursor-pointer">
						<span className="block text-[0.95rem] font-semibold">
							Odgovori na kraju serije
						</span>
						<span className="mt-0.5 block text-[0.85rem] leading-snug text-muted-foreground">
							Točno i netočno vidiš tek na kraju, kao na ispitu.
						</span>
					</label>
					<Switch
						id={switchId}
						checked={endFeedback}
						onCheckedChange={setEndFeedback}
						className="mt-1"
					/>
				</div>
			</div>

			<div className="sticky -bottom-[calc(1.25rem+env(safe-area-inset-bottom))] -mx-5 mt-6 -mb-[calc(1.25rem+env(safe-area-inset-bottom))] border-t border-border bg-background px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
				<Button
					asChild={canStart}
					disabled={!canStart}
					className="h-12 w-full rounded-full text-[1rem] font-semibold"
				>
					{canStart ? (
						<Link
							to="/vjezba/serija"
							search={{
								mode,
								area,
								length,
								level,
								feedback: endFeedback ? "end" : "instant",
							}}
						>
							Kreni ({count} {pluralHr(count, "pitanje", "pitanja", "pitanja")})
							<ArrowRight className="size-4" aria-hidden="true" />
						</Link>
					) : (
						<span>
							{needsArea && !area ? "Odaberi područje" : "Nema pitanja"}
						</span>
					)}
				</Button>
			</div>
		</>
	);
}

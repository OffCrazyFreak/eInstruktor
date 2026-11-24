import { Lightbulb } from "lucide-react";
import type { ExamLevel, ICourse } from "@/content/course-types";
import { examPool } from "@/lib/content/exam-questions";
import { recentAccuracy } from "@/lib/progress/accuracy";
import type { IAttempt } from "@/lib/progress/progress-schema";

interface IPracticeHintProps {
	course: ICourse;
	level: ExamLevel;
	attempts: readonly IAttempt[];
}

// A hint, never a gate: the bootsbase.de app comparison suggests starting mock exams at about 80 percent.
const SUGGESTED_ACCURACY = 0.8;

export default function PracticeHint({
	course,
	level,
	attempts,
}: IPracticeHintProps) {
	const { accuracy } = recentAccuracy(
		attempts,
		examPool(course, level).map((question) => question.id),
	);

	const percent = accuracy === null ? null : Math.round(accuracy * 100);
	const reached = accuracy !== null && accuracy >= SUGGESTED_ACCURACY;

	return (
		<p className="flex gap-2.5 px-1 text-[0.92rem] leading-snug text-muted-foreground">
			<Lightbulb
				className="mt-0.5 size-4 shrink-0 text-ocean dark:text-[#4cc2ff]"
				aria-hidden="true"
			/>
			<span>
				Preporučeno kad ti točnost u vježbi prijeđe{" "}
				{Math.round(SUGGESTED_ACCURACY * 100)} %.
				{percent !== null && (
					<>
						{" "}
						<span className="font-semibold text-foreground">
							{reached
								? `Tvoja je ${percent} %, možeš krenuti.`
								: `Sad je ${percent} %.`}
						</span>
					</>
				)}
			</span>
		</p>
	);
}

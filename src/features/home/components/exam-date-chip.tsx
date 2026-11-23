import { CalendarClock } from "lucide-react";
import LevelSheet from "@/components/custom/app-shell/level-sheet";
import { daysBetween } from "@/lib/dates/study-day";
import { pluralHr } from "@/lib/plural";

interface IExamDateChipProps {
	examDate: string;
	today: string;
}

function chipText(daysLeft: number): string {
	if (daysLeft > 0) {
		return `Ispit za ${daysLeft} ${pluralHr(daysLeft, "dan", "dana", "dana")}`;
	}

	return daysLeft === 0 ? "Ispit je danas" : "Ispit je prošao";
}

export default function ExamDateChip({ examDate, today }: IExamDateChipProps) {
	return (
		<LevelSheet>
			<button
				type="button"
				className="inline-flex h-11 items-center gap-1.5 rounded-full bg-[#ffb43c]/20 px-3.5 text-[0.85rem] font-semibold text-[#7a4600] outline-none hover:bg-[#ffb43c]/30 focus-visible:ring-[3px] focus-visible:ring-ring/60 dark:text-[#ffd48a]"
			>
				<CalendarClock className="size-4" aria-hidden="true" />
				{chipText(daysBetween(today, examDate))}
			</button>
		</LevelSheet>
	);
}

import { Anchor, CalendarDays } from "lucide-react";
import { useId } from "react";
import { Switch } from "@/components/ui/switch";
import { formatDay } from "@/lib/dates/format-day";
import { pluralHr } from "@/lib/plural";
import type { IStreak } from "@/lib/progress/streak";

interface IStudyDaysCardProps {
	streak: IStreak;
	totalDays: number;
	passedAt: number | null;
	onPassedChange: (passed: boolean) => void;
}

function days(count: number): string {
	return `${count} ${pluralHr(count, "dan", "dana", "dana")}`;
}

// The audience learns for one exam, so once it is passed the streak has done its job and disappears (UX research section 7).
export default function StudyDaysCard({
	streak,
	totalDays,
	passedAt,
	onPassedChange,
}: IStudyDaysCardProps) {
	const switchId = useId();

	return (
		<section
			aria-labelledby="study-days-title"
			className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5"
		>
			<h2 id="study-days-title" className="font-serif text-xl">
				{passedAt === null ? "Dani učenja" : "Ispit je položen"}
			</h2>

			{passedAt === null ? (
				<div className="mt-2 space-y-1">
					<p className="inline-flex items-center gap-2 text-[1.05rem] font-semibold">
						<CalendarDays
							className="size-5 text-[#0a63b0] dark:text-[#4cc2ff]"
							aria-hidden="true"
						/>
						{streak.daysThisWeek} od zadnjih 7 dana
					</p>
					<p className="text-[0.9rem] text-muted-foreground">
						{streak.run > 1 && `Zaredom ${days(streak.run)}. `}
						Ukupno {days(totalDays)}. Dan se broji s 5 pitanja ili jednom
						lekcijom.
					</p>
				</div>
			) : (
				<p className="mt-2 flex gap-2 text-[0.95rem] leading-relaxed">
					<Anchor
						className="mt-0.5 size-5 shrink-0 text-[#a35f00] dark:text-[#ffd48a]"
						aria-hidden="true"
					/>
					Čestitamo! Označio si {formatDay(passedAt)} da si položio. Dane učenja
					više ne brojimo, a lekcije i vježba ostaju ti za ponavljanje.
				</p>
			)}

			<div className="mt-4 flex min-h-12 items-center justify-between gap-4 border-t border-border pt-3">
				<label htmlFor={switchId} className="min-w-0">
					<span className="block font-semibold">Položio sam</span>
					<span className="block text-[0.85rem] text-muted-foreground">
						Završava praćenje dana učenja.
					</span>
				</label>
				<Switch
					id={switchId}
					checked={passedAt !== null}
					onCheckedChange={onPassedChange}
				/>
			</div>
		</section>
	);
}

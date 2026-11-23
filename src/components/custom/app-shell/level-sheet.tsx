import { Check } from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { ExamLevel } from "@/content/course-types";
import { setExamDate, setTargetLevel } from "@/lib/progress/progress-actions";
import useProgress from "@/lib/progress/use-progress";
import { cn } from "@/lib/utils";

interface ILevelSheetProps {
	/** The element that opens the sheet, such as the level chip. */
	children: ReactNode;
}

const LEVEL_CHOICES: { level: ExamLevel; title: string; detail: string }[] = [
	{
		level: "A",
		title: "Kategorija A",
		detail: "Od 15 godina. Brodica do 7 m i 15 kW, do 6 NM od obale.",
	},
	{
		level: "B",
		title: "Kategorija B",
		detail:
			"Od 16 godina. Brodice do 15 m i jahte do 18 m, do 12 NM. Pokriva i sve iz A.",
	},
];

export default function LevelSheet({ children }: ILevelSheetProps) {
	const { progress, update } = useProgress();

	function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;

		update((current) => setExamDate(current, value === "" ? null : value));
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent
				side="bottom"
				className="mx-auto max-h-[90svh] max-w-xl gap-0 overflow-y-auto rounded-t-[1.6rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
			>
				<SheetTitle className="font-serif text-xl">
					Za koju kategoriju učiš?
				</SheetTitle>
				<SheetDescription className="mt-1">
					Lekcije, pitanja i procjena spremnosti prate kategoriju koju odabereš.
					Možeš je promijeniti kad god želiš.
				</SheetDescription>

				<fieldset className="mt-5 space-y-2.5">
					<legend className="sr-only">Kategorija</legend>

					{LEVEL_CHOICES.map((choice) => {
						const chosen = progress.targetLevel === choice.level;

						return (
							<label
								key={choice.level}
								className={cn(
									"flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border-2 bg-card p-4 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/60",
									chosen
										? "border-primary bg-[#eaf3ff] dark:bg-accent"
										: "border-border",
								)}
							>
								<input
									type="radio"
									name="target-level"
									value={choice.level}
									checked={chosen}
									onChange={() =>
										update((current) => setTargetLevel(current, choice.level))
									}
									className="sr-only"
								/>

								<span
									aria-hidden="true"
									className={cn(
										"grid size-9 shrink-0 place-items-center rounded-full border-2 font-mono font-semibold",
										chosen
											? "border-primary bg-primary text-primary-foreground"
											: "border-[#002c78]/25 text-[#0a63b0]",
									)}
								>
									{chosen ? <Check className="size-4" /> : choice.level}
								</span>

								<span className="min-w-0">
									<span className="flex flex-wrap items-center gap-2 font-semibold">
										{choice.title}
										{choice.level === "B" && (
											<span className="rounded-full bg-[#ffb43c]/25 px-2 py-0.5 font-mono text-[0.68rem] tracking-wider text-[#8a5200] dark:text-[#ffd48a]">
												PREPORUKA
											</span>
										)}
									</span>
									<span className="mt-0.5 block text-[0.9rem] leading-snug text-muted-foreground">
										{choice.detail}
									</span>
								</span>
							</label>
						);
					})}
				</fieldset>

				<label className="mt-5 block">
					<span className="text-[0.95rem] font-semibold">Datum ispita</span>
					<span className="block text-[0.85rem] text-muted-foreground">
						Ako ga već znaš, računamo koliko je dana ostalo.
					</span>
					<input
						type="date"
						value={progress.examDate ?? ""}
						onChange={handleDateChange}
						className="mt-2 h-12 w-full rounded-xl border-2 border-border bg-card px-3 text-[1rem] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
					/>
				</label>

				<SheetClose asChild>
					<Button className="mt-6 h-12 w-full rounded-full text-[1rem] font-semibold">
						Gotovo
					</Button>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
}

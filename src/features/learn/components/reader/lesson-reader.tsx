import { useNavigate } from "@tanstack/react-router";
import { CircleCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { ILesson } from "@/content/types";
import course from "@/content/voditelj-brodice";
import BOnlyBlock from "@/features/learn/components/blocks/b-only-block";
import LessonBlock from "@/features/learn/components/blocks/lesson-block";
import LessonActionBar from "@/features/learn/components/reader/lesson-action-bar";
import LessonEndCard from "@/features/learn/components/reader/lesson-end-card";
import ReaderTopBar from "@/features/learn/components/reader/reader-top-bar";
import useReadingPercent from "@/features/learn/hooks/use-reading-percent";
import { blockSummary } from "@/features/learn/utils/block-summary";
import { getArea } from "@/lib/content/course-selectors";
import { nextLesson } from "@/lib/content/lesson-order";
import { getVisibleBlocks } from "@/lib/content/visible-blocks";
import {
	markLessonDone,
	markLessonUnread,
	openLesson,
	setLessonPercent,
} from "@/lib/progress/progress-actions";
import useProgress from "@/lib/progress/use-progress";

interface ILessonReaderProps {
	lesson: ILesson;
}

// Saving every scroll frame would rewrite localStorage constantly; steps of 5 percent are enough for "Nastavi".
const PERCENT_STEP = 0.05;

export default function LessonReader({ lesson }: ILessonReaderProps) {
	const navigate = useNavigate();
	const { progress, ready, level, update } = useProgress();
	const [sessionId] = useState(() => crypto.randomUUID());
	const percent = useReadingPercent();

	const isIntro = lesson.slug === course.introLessonSlug;
	const isBLesson = lesson.level === "B";
	const area = getArea(course, lesson.area);
	const next = nextLesson(course, lesson.slug, level);
	const done = ready && progress.lessonsDone[lesson.slug] !== undefined;
	const savedPercent = Math.floor(percent / PERCENT_STEP) * PERCENT_STEP;

	// A B learner needs every block; an A learner sees B depth folded away, and a whole B lesson stays open because it was opened on purpose.
	const blocks = getVisibleBlocks(lesson, "B").map((visible, position) => ({
		...visible,
		key: `${lesson.slug}:${position}`,
		collapsed: level === "A" && !isBLesson,
		badged: visible.isBOnly && !isBLesson,
	}));

	useEffect(() => {
		update((current) => openLesson(current, lesson.slug, Date.now()));
	}, [lesson.slug, update]);

	useEffect(() => {
		update((current) => setLessonPercent(current, lesson.slug, savedPercent));
	}, [lesson.slug, savedPercent, update]);

	function goNext() {
		if (next) {
			void navigate({
				to: "/ucenje/$area/$lesson",
				params: { area: next.area, lesson: next.slug },
			});
		} else {
			void navigate({ to: "/ucenje" });
		}
	}

	function handleFinish() {
		update((current) => markLessonDone(current, lesson.slug, Date.now()));
		goNext();
	}

	return (
		<>
			<ReaderTopBar
				title={lesson.title}
				backTo={isIntro ? null : { area: lesson.area }}
				percent={percent}
			/>

			<main className="mx-auto max-w-2xl px-4 pt-7 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:px-6">
				<p className="font-mono text-[0.74rem] tracking-[0.2em] text-[#0a63b0] dark:text-[#4cc2ff]">
					{isIntro ? "PRIJE SVEGA" : area?.title.toUpperCase()}
				</p>
				<h1 className="mt-2 font-serif text-[1.85rem] leading-tight sm:text-4xl">
					{lesson.title}
				</h1>
				<p className="mt-3 text-[1.02rem] leading-relaxed text-muted-foreground">
					{lesson.summary}
				</p>

				<div className="mt-4 flex flex-wrap items-center gap-2 text-[0.85rem]">
					<span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
						<Clock className="size-3.5" aria-hidden="true" />
						{lesson.minutes} min
					</span>

					{isBLesson && (
						<span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">
							Kategorija B
						</span>
					)}

					{done && (
						<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
							<CircleCheck className="size-3.5" aria-hidden="true" />
							Gotovo
						</span>
					)}
				</div>

				{ready && isBLesson && level === "A" && (
					<p className="mt-5 rounded-2xl border border-dashed border-[#002c78]/25 p-4 text-[0.95rem]">
						Ova lekcija je za kategoriju B. Za ispit A ti ne treba, ali je
						slobodno pročitaj.
					</p>
				)}

				<div className="mt-8 space-y-6">
					{blocks.map(({ block, key, badged, collapsed }) => {
						return badged ? (
							<BOnlyBlock
								key={key}
								collapsed={collapsed}
								summary={blockSummary(block)}
							>
								<LessonBlock
									block={block}
									lessonSlug={lesson.slug}
									sessionId={sessionId}
								/>
							</BOnlyBlock>
						) : (
							<div key={key}>
								<LessonBlock
									block={block}
									lessonSlug={lesson.slug}
									sessionId={sessionId}
								/>
							</div>
						);
					})}
				</div>

				<div className="mt-10">
					<LessonEndCard
						next={next}
						cheatSheetArea={isIntro ? null : lesson.area}
					/>
				</div>
			</main>

			<LessonActionBar
				done={done}
				nextLabel={next ? "Sljedeća lekcija" : "Natrag na učenje"}
				onFinish={handleFinish}
				onUnread={() =>
					update((current) => markLessonUnread(current, lesson.slug))
				}
				onNext={goNext}
			/>
		</>
	);
}

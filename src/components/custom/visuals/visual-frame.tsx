import { Suspense } from "react";
import type { VisualProps } from "@/components/custom/visuals/shared/visual-props";
import VisualErrorBoundary from "@/components/custom/visuals/visual-error-boundary";
import { VISUALS } from "@/components/custom/visuals/visual-registry";
import type { VisualId } from "@/content/types";
import { cn } from "@/lib/utils";

interface IVisualFrameProps {
	visual: VisualId;
	caption?: string;
	props?: VisualProps;
	/** Question media before the learner answers: the visual leaves out names and text that give the answer away. */
	hideAnswer?: boolean;
	className?: string;
}

/**
 * Card around one interactive visual: same padding everywhere, a caption, and a calm fallback if it fails.
 * Visuals seed their state from props once, so the frame remounts when the id or props change.
 * Two questions can share the same props, so a consumer that swaps questions in place should also pass `key={question.id}`.
 */
export default function VisualFrame({
	visual,
	caption,
	props,
	hideAnswer = false,
	className,
}: IVisualFrameProps) {
	const Visual = VISUALS[visual];
	const shownProps = hideAnswer ? { ...props, hideAnswer: true } : props;
	const instance = `${visual}:${JSON.stringify(shownProps ?? {})}`;

	return (
		<figure
			className={cn(
				"m-0 min-w-0 rounded-[1.4rem] border border-ink/12 bg-white/85 p-3 text-ink shadow-[0_10px_30px_-18px_rgba(0,44,120,0.45)] sm:p-5",
				className,
			)}
		>
			<VisualErrorBoundary
				key={instance}
				fallback={
					<p className="rounded-2xl bg-tint p-4 text-[0.92rem]">
						Ovaj prikaz se nije učitao. Osvježi stranicu ili nastavi s lekcijom.
					</p>
				}
			>
				<Suspense
					fallback={
						<div className="h-72 animate-pulse rounded-2xl bg-tint">
							<span className="sr-only">Učitavam prikaz</span>
						</div>
					}
				>
					<Visual props={shownProps} />
				</Suspense>
			</VisualErrorBoundary>

			{caption && (
				<figcaption className="mt-3 px-1 text-[0.86rem] leading-relaxed text-ink/70">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}

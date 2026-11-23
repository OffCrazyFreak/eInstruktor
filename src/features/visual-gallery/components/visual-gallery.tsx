import VisualFrame from "@/components/custom/visuals/visual-frame";
import type { VisualId } from "@/content/types";
import GalleryLink from "@/features/visual-gallery/components/gallery-link";
import { GALLERY } from "@/features/visual-gallery/constants/gallery-variants";

interface IVisualGalleryProps {
	/** Shows only this visual, for quick checks and screenshots. */
	only?: VisualId;
	/** With `only`, shows just this variant, for screenshots. */
	variant?: number;
}

/** Internal QA page: every visual with every prop combination the lessons and questions use. */
export default function VisualGallery({ only, variant }: IVisualGalleryProps) {
	const shown = only ? GALLERY.filter((visual) => visual.id === only) : GALLERY;

	return (
		<div className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6">
			<p className="font-mono text-[0.72rem] tracking-[0.16em] text-[#0a63b0] uppercase">
				Interna stranica
			</p>
			<h1 className="mt-1 font-serif text-3xl text-[#002c78] sm:text-4xl">
				Vizuali
			</h1>
			<p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-[#002c78]/75">
				Svaki interaktivni prikaz iz lekcija, sa svim postavkama koje lekcije i
				pitanja koriste. Stranica nije u tražilicama.
			</p>

			<nav aria-label="Vizuali" className="mt-5 flex flex-wrap gap-1.5">
				<GalleryLink to={undefined} active={!only} label="Svi" />
				{GALLERY.map((visual) => (
					<GalleryLink
						key={visual.id}
						to={visual.id}
						active={only === visual.id}
						label={visual.title}
					/>
				))}
			</nav>

			<div className="mt-10 space-y-14">
				{shown.map((visual) => (
					<section
						key={visual.id}
						id={visual.id}
						aria-labelledby={`${visual.id}-title`}
					>
						<h2
							id={`${visual.id}-title`}
							className="font-serif text-2xl text-[#002c78]"
						>
							{visual.title}
						</h2>
						<p className="font-mono text-[0.75rem] text-[#0a63b0]">
							{visual.id}
						</p>

						<div className="mt-4 space-y-8">
							{visual.variants
								.filter(
									(_, position) =>
										variant === undefined || position === variant,
								)
								.map((props) => {
									const label = JSON.stringify(props);

									return (
										<div key={label}>
											<p className="mb-2 overflow-x-auto font-mono text-[0.72rem] text-[#002c78]/60">
												{label}
											</p>
											<VisualFrame visual={visual.id} props={props} />
										</div>
									);
								})}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}

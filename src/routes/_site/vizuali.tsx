import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { VISUALS } from "@/components/custom/visuals/visual-registry";
import type { VisualId } from "@/content/types";
import VisualGallery from "@/features/visual-gallery/components/visual-gallery";

const VISUAL_IDS = Object.keys(VISUALS) as [VisualId, ...VisualId[]];

const searchSchema = z.object({
	v: z.enum(VISUAL_IDS).optional().catch(undefined),
	i: z.number().int().min(0).optional().catch(undefined),
});

export const Route = createFileRoute("/_site/vizuali")({
	validateSearch: searchSchema,
	head: () => ({
		meta: [
			{ title: "Vizuali | eInstruktor" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
	component: VisualGalleryPage,
});

function VisualGalleryPage() {
	const { v, i } = Route.useSearch();

	return (
		<main>
			<VisualGallery only={v} variant={i} />
		</main>
	);
}

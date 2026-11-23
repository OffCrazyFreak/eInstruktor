import { type ComponentType, createElement, lazy } from "react";
import type { VisualProps } from "@/components/custom/visuals/shared/visual-props";
import type { VisualId } from "@/content/types";

export type VisualComponent = ComponentType<{ props?: VisualProps }>;

interface IVisualModule<P extends object> {
	default: ComponentType<P>;
	/** Turns the free-form content props into the visual's typed props, dropping unknown keys and values. */
	fromVisualProps: (props: VisualProps | undefined) => P;
}

function lazyVisual<P extends object>(
	load: () => Promise<IVisualModule<P>>,
): VisualComponent {
	return lazy(async () => {
		const module = await load();

		function LoadedVisual({ props }: { props?: VisualProps }) {
			return createElement(module.default, module.fromVisualProps(props));
		}

		return { default: LoadedVisual };
	});
}

export const VISUALS: Partial<Record<VisualId, VisualComponent>> = {
	"iala-buoy-explorer": lazyVisual(
		() =>
			import(
				"@/components/custom/visuals/iala-buoy-explorer/iala-buoy-explorer"
			),
	),
	"cardinal-quadrant": lazyVisual(
		() =>
			import("@/components/custom/visuals/cardinal-quadrant/cardinal-quadrant"),
	),
	"ship-lights-viewer": lazyVisual(
		() =>
			import(
				"@/components/custom/visuals/ship-lights-viewer/ship-lights-viewer"
			),
	),
	"day-shapes": lazyVisual(
		() => import("@/components/custom/visuals/day-shapes/day-shapes"),
	),
	"sound-signal-player": lazyVisual(
		() =>
			import(
				"@/components/custom/visuals/sound-signal-player/sound-signal-player"
			),
	),
	"collision-situations": lazyVisual(
		() =>
			import(
				"@/components/custom/visuals/collision-situations/collision-situations"
			),
	),
	"compass-course-calculator": lazyVisual(
		() =>
			import(
				"@/components/custom/visuals/compass-course-calculator/compass-course-calculator"
			),
	),
	"light-characteristic-reader": lazyVisual(
		() =>
			import(
				"@/components/custom/visuals/light-characteristic-reader/light-characteristic-reader"
			),
	),
	"vhf-radio-call": lazyVisual(
		() => import("@/components/custom/visuals/vhf-radio-call/vhf-radio-call"),
	),
	"phonetic-alphabet": lazyVisual(
		() =>
			import("@/components/custom/visuals/phonetic-alphabet/phonetic-alphabet"),
	),
};

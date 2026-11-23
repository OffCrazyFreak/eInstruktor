import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IRouteArrowMarkerProps {
	id: string;
	color?: string;
}

/** Arrowhead for dotted route lines; give each SVG its own id from `useId`. */
export default function RouteArrowMarker({
	id,
	color = PALETTE.sun,
}: IRouteArrowMarkerProps) {
	return (
		<marker
			id={id}
			viewBox="0 0 10 10"
			refX="6"
			refY="5"
			markerWidth="5"
			markerHeight="5"
			orient="auto-start-reverse"
		>
			<path d="M0 0 L10 5 L0 10 z" fill={color} />
		</marker>
	);
}

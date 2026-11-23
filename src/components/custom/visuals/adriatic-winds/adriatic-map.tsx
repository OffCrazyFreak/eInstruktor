import {
	WIND_IDS,
	WINDS,
	type WindId,
} from "@/components/custom/visuals/adriatic-winds/winds";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";

interface IAdriaticMapProps {
	selected: readonly WindId[];
	/** Quiz mode: arrows carry no names. */
	hideNames?: boolean;
	onSelect?: (wind: WindId) => void;
}

const C = { x: 162, y: 150 };

function polar(angle: number, radius: number): [number, number] {
	const radians = (angle * Math.PI) / 180;

	return [C.x + radius * Math.sin(radians), C.y - radius * Math.cos(radians)];
}

/** A simplified Adriatic with an eight point wind rose; each arrow blows from its direction toward the middle. */
export default function AdriaticMap({
	selected,
	hideNames = false,
	onSelect,
}: IAdriaticMapProps) {
	return (
		<svg
			viewBox="0 0 320 300"
			className="block w-full"
			role="img"
			aria-label={`Ruža vjetrova na Jadranu${selected.length && !hideNames ? `: ${selected.map((id) => WINDS[id].name).join(" i ")}` : ""}`}
		>
			<rect width="320" height="300" rx="16" fill={PALETTE.land} />
			<path
				d="M20 30 L95 8 L170 48 L238 118 L300 196 L320 232 V300 H262 L208 246 L140 188 L72 124 L30 76 z"
				fill={PALETTE.sea}
			/>
			<g fill={PALETTE.land} stroke={PALETTE.landEdge}>
				<ellipse cx="160" cy="70" rx="9" ry="4" transform="rotate(40 160 70)" />
				<ellipse
					cx="190"
					cy="104"
					rx="12"
					ry="4"
					transform="rotate(40 190 104)"
				/>
				<ellipse
					cx="226"
					cy="150"
					rx="14"
					ry="4"
					transform="rotate(30 226 150)"
				/>
				<ellipse
					cx="258"
					cy="186"
					rx="10"
					ry="3.5"
					transform="rotate(35 258 186)"
				/>
			</g>
			<g
				fontSize="10"
				fill={PALETTE.navy}
				opacity="0.7"
				fontFamily="var(--font-serif)"
			>
				<text x="246" y="124">
					Hrvatska
				</text>
				<text x="40" y="200">
					Italija
				</text>
			</g>

			{WIND_IDS.map((id) => {
				const wind = WINDS[id];
				const active = selected.includes(id);
				const [tailX, tailY] = polar(wind.from, 118);
				const [headX, headY] = polar(wind.from, 36);
				const [labelX, labelY] = polar(wind.from, 126);

				return (
					<g
						key={id}
						onClick={() => onSelect?.(id)}
						className={onSelect ? "cursor-pointer" : undefined}
						aria-hidden
					>
						<line
							x1={tailX}
							y1={tailY}
							x2={headX}
							y2={headY}
							stroke={active ? PALETTE.sun : PALETTE.navy}
							strokeOpacity={active ? 1 : 0.35}
							strokeWidth={active ? 6 : 3}
							strokeLinecap="round"
						/>
						<circle
							cx={headX}
							cy={headY}
							r={active ? 6 : 4}
							fill={active ? PALETTE.sun : PALETTE.navy}
							fillOpacity={active ? 1 : 0.35}
						/>
						<text
							x={labelX}
							y={labelY + 4}
							textAnchor="middle"
							fontSize="11"
							fontWeight={active ? 700 : 500}
							fill={PALETTE.navy}
						>
							{hideNames ? wind.direction : `${wind.name} ${wind.direction}`}
						</text>
					</g>
				);
			})}
			<circle cx={C.x} cy={C.y} r="5" fill={PALETTE.navy} />
		</svg>
	);
}

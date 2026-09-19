import { motion } from "motion/react";
import { winds } from "@/features/landing/content";
import { cn } from "@/lib/utils";

/**
 * Wind rose / compass illustration, salvaged from the retired v5 concept and
 * recolored to the brand blues. Scales to its container (width 100%) and keeps
 * the star, ticks and cardinal labels inside the viewBox so nothing clips.
 */

type WindRoseProps = {
	animated: boolean;
	className?: string;
	navy?: string;
	sky?: string;
	line?: string;
	label?: string;
};

const C = 180; // center of the 360x360 viewBox

function polar(deg: number, r: number) {
	const a = ((deg - 90) * Math.PI) / 180;
	return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r };
}

export function WindRose({
	animated,
	className,
	navy = "#002c78",
	sky = "#00aef3",
	line = "rgba(0,44,120,0.16)",
	label = "#002c78",
}: WindRoseProps) {
	const majors = [0, 45, 90, 135, 180, 225, 270, 315];
	const cardinals = [
		{ d: 0, t: "S" },
		{ d: 90, t: "I" },
		{ d: 180, t: "J" },
		{ d: 270, t: "Z" },
	];
	return (
		<svg
			viewBox="0 0 360 360"
			className={cn("block h-auto w-full", className)}
			role="img"
			aria-label="Ruža vjetrova s četiri jadranska vjetra"
		>
			<circle cx={C} cy={C} r="150" fill="none" stroke={line} />
			<circle cx={C} cy={C} r="112" fill="none" stroke={line} />
			<circle cx={C} cy={C} r="72" fill="none" stroke={line} />

			{Array.from({ length: 72 }, (_, i) => i * 5).map((deg) => {
				const p1 = polar(deg, deg % 45 === 0 ? 142 : 146);
				const p2 = polar(deg, 150);
				return (
					<line
						key={deg}
						x1={p1.x}
						y1={p1.y}
						x2={p2.x}
						y2={p2.y}
						stroke={line}
						strokeWidth="0.8"
					/>
				);
			})}

			{/* eight-point star */}
			{majors.map((d) => {
				const tip = polar(d, 136);
				const l = polar(d + 22.5, 56);
				const r = polar(d - 22.5, 56);
				const cardinal = d % 90 === 0;
				return (
					<path
						key={d}
						d={`M${tip.x} ${tip.y} L${l.x} ${l.y} L${C} ${C} L${r.x} ${r.y} Z`}
						fill={cardinal ? (d === 0 ? sky : navy) : navy}
						fillOpacity={cardinal ? 0.92 : 0.16}
					/>
				);
			})}

			{/* the four Adriatic winds gusting along their bearings */}
			{winds.map((w, i) => {
				const from = polar(w.deg, 158);
				const to = polar(w.deg, 138);
				return (
					<motion.line
						key={w.name}
						x1={from.x}
						y1={from.y}
						x2={to.x}
						y2={to.y}
						stroke={sky}
						strokeWidth="2.6"
						strokeLinecap="round"
						animate={animated ? { opacity: [0.25, 1, 0.25] } : undefined}
						transition={
							animated
								? { duration: 2.8, repeat: Infinity, delay: i * 0.5 }
								: undefined
						}
					/>
				);
			})}

			{cardinals.map((c) => {
				const p = polar(c.d, 168);
				return (
					<text
						key={c.t}
						x={p.x}
						y={p.y}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="15"
						fontFamily="var(--font-mono)"
						fontWeight="700"
						fill={c.d === 0 ? sky : label}
					>
						{c.t}
					</text>
				);
			})}
			<circle cx={C} cy={C} r="6" fill={navy} />
		</svg>
	);
}

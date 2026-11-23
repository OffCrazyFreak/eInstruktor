import { type MotionValue, motion, useTransform } from "motion/react";

interface IMoonProps {
	scrollYProgress: MotionValue<number>;
}

/** The moon, rising on the left once it is dark and settling in frame on the right. */
export default function Moon({ scrollYProgress }: IMoonProps) {
	const moonX = useTransform(scrollYProgress, [0.5, 1], ["58%", "86%"]);
	const moonY = useTransform(
		scrollYProgress,
		[0.5, 0.78, 1],
		["46vh", "24vh", "22vh"],
	);
	const moonOpacity = useTransform(scrollYProgress, [0.42, 0.54, 1], [0, 1, 1]);

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none fixed -z-10"
			style={{
				left: moonX,
				top: moonY,
				x: "-50%",
				y: "-50%",
				opacity: moonOpacity,
			}}
		>
			<div
				className="relative h-28 w-28 rounded-full"
				style={{
					background: "radial-gradient(circle at 42% 40%, #ffffff, #cdd9f2)",
					boxShadow: "0 0 70px 26px rgba(200,220,255,0.45)",
				}}
			>
				<span
					className="absolute rounded-full"
					style={{
						left: "58%",
						top: "30%",
						width: 14,
						height: 14,
						background: "rgba(120,150,200,0.22)",
					}}
				/>
				<span
					className="absolute rounded-full"
					style={{
						left: "34%",
						top: "58%",
						width: 9,
						height: 9,
						background: "rgba(120,150,200,0.2)",
					}}
				/>
			</div>
		</motion.div>
	);
}

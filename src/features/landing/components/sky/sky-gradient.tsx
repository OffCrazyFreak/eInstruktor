import {
	type MotionValue,
	motion,
	useMotionTemplate,
	useTransform,
} from "motion/react";

interface ISkyGradientProps {
	reduce: boolean;
	scrollYProgress: MotionValue<number>;
}

/** Starts pure white and light blue and dives into deep navy as you scroll. */
export default function SkyGradient({
	reduce,
	scrollYProgress,
}: ISkyGradientProps) {
	const topStop = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		["#ffffff", "#cfe8fb", "#04142e"],
	);
	const midStop = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		["#eaf6ff", "#8cc2ee", "#061a3a"],
	);
	const botStop = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		["#dcefff", "#3f8fca", "#020e24"],
	);
	const sky = useMotionTemplate`linear-gradient(180deg, ${topStop} 0%, ${midStop} 48%, ${botStop} 100%)`;

	if (reduce) {
		return (
			<div
				aria-hidden="true"
				className="fixed inset-0 -z-20"
				style={{
					background: "linear-gradient(180deg,#ffffff,#cfe8fb 48%,#dcefff)",
				}}
			/>
		);
	}

	return (
		<motion.div
			aria-hidden="true"
			className="fixed inset-0 -z-20"
			style={{ background: sky }}
		/>
	);
}

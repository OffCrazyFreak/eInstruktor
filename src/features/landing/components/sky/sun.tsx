import { type MotionValue, motion, useTransform } from "motion/react";

interface ISunProps {
	reduce: boolean;
	scrollYProgress: MotionValue<number>;
}

/** The warm sun, crossing left to right and setting behind the right edge. */
export default function Sun({ reduce, scrollYProgress }: ISunProps) {
	// sun starts in frame on the left, crosses right and fully sets behind the
	// right edge well before the end (138% clears the disc + glow on mobile too)
	const sunX = useTransform(scrollYProgress, [0, 0.6], ["10%", "150%"]);
	const sunY = useTransform(
		scrollYProgress,
		[0, 0.18, 0.386, 0.6],
		["24vh", "10vh", "62vh", "95vh"],
	);

	if (reduce) {
		return (
			<div
				aria-hidden="true"
				className="pointer-events-none fixed -z-10"
				style={{
					left: "20%",
					top: "16vh",
					transform: "translate(-50%,-50%)",
				}}
			>
				<div
					className="h-40 w-40 rounded-full"
					style={{
						background: "radial-gradient(circle at 50% 45%, #ffe89a, #ffb43c)",
						boxShadow: "0 0 110px 50px rgba(255,190,90,0.55)",
					}}
				/>
			</div>
		);
	}

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none fixed -z-10"
			style={{ left: sunX, top: sunY, x: "-50%", y: "-50%" }}
		>
			<div
				className="h-44 w-44 rounded-full"
				style={{
					background: "radial-gradient(circle at 50% 45%, #ffe89a, #ffb43c)",
					boxShadow: "0 0 120px 56px rgba(255,190,90,0.55)",
				}}
			/>
		</motion.div>
	);
}

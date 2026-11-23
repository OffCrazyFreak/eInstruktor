import { type MotionValue, motion, useTransform } from "motion/react";

interface IStarFieldProps {
	reduce: boolean;
	scrollYProgress: MotionValue<number>;
}

const STARS = Array.from({ length: 40 }, (_, i) => ({
	x: (i * 53.7) % 100,
	y: (i * 29.3) % 60,
	s: (i % 3) + 1,
}));

export default function StarField({
	reduce,
	scrollYProgress,
}: IStarFieldProps) {
	const starOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10"
			style={{ opacity: reduce ? 0 : starOpacity }}
		>
			{STARS.map((star) => (
				<span
					key={`${star.x}-${star.y}`}
					className="absolute rounded-full bg-white"
					style={{
						left: `${star.x}%`,
						top: `${star.y}%`,
						width: star.s,
						height: star.s,
						opacity: 0.9,
					}}
				/>
			))}
		</motion.div>
	);
}

interface ICourseLineProps {
	/** Share of the lesson read, 0 to 1. */
	percent: number;
}

/** The course line: a dashed bearing from harbour to the next mark, with the sun where the learner is now. */
export default function CourseLine({ percent }: ICourseLineProps) {
	const position = 4 + percent * 92;

	return (
		<svg
			viewBox="0 0 100 8"
			preserveAspectRatio="none"
			className="h-3 w-full"
			aria-hidden="true"
		>
			<line
				x1="4"
				y1="4"
				x2="96"
				y2="4"
				stroke="currentColor"
				strokeOpacity="0.35"
				strokeWidth="1"
				strokeDasharray="2 2"
				vectorEffect="non-scaling-stroke"
			/>
			<line
				x1="4"
				y1="4"
				x2={position}
				y2="4"
				stroke="#00aef3"
				strokeWidth="2"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}

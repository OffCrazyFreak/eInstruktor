import { useId } from "react";

interface ICourseSliderProps {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	display: string;
	onChange: (value: number) => void;
}

export default function CourseSlider({
	label,
	value,
	min,
	max,
	step = 1,
	display,
	onChange,
}: ICourseSliderProps) {
	const id = useId();

	return (
		<div>
			<label
				htmlFor={id}
				className="flex justify-between gap-2 text-[0.85rem] font-medium"
			>
				<span>{label}</span>
				<span className="font-mono">{display}</span>
			</label>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
				className="mt-1 w-full accent-ink"
			/>
		</div>
	);
}

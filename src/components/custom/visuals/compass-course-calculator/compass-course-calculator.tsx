import { useState } from "react";
import {
	compassFromMagnetic,
	formatCorrection,
	formatCourse,
	magneticFromTrue,
	pointName,
	quadrantName,
	reciprocal,
} from "@/components/custom/visuals/compass-course-calculator/course-math";
import CourseSlider from "@/components/custom/visuals/compass-course-calculator/course-slider";
import RoseDial from "@/components/custom/visuals/compass-course-calculator/rose-dial";
import { PALETTE } from "@/components/custom/visuals/shared/visual-palette";
import {
	readNumber,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";

const MODES = ["course", "variation-deviation"] as const;

export interface ICompassCourseCalculatorProps {
	/** "course" reads a heading; "variation-deviation" converts true course to compass course. */
	mode?: (typeof MODES)[number];
	trueCourse?: number;
	/** Degrees, east plus and west minus. */
	variation?: number;
	deviation?: number;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): ICompassCourseCalculatorProps {
	return {
		mode: readOption(props, "mode", MODES),
		trueCourse: readNumber(props, "trueCourse", { min: 0, max: 359 }),
		variation: readNumber(props, "variation", { min: -15, max: 15 }),
		deviation: readNumber(props, "deviation", { min: -15, max: 15 }),
	};
}

export default function CompassCourseCalculator({
	mode = "course",
	trueCourse = 45,
	variation = 3,
	deviation = -2,
}: ICompassCourseCalculatorProps) {
	const [course, setCourse] = useState(trueCourse);
	const [variationValue, setVariation] = useState(variation);
	const [deviationValue, setDeviation] = useState(deviation);
	const [drift, setDrift] = useState(0);
	const magnetic = magneticFromTrue(course, variationValue);
	const compass = compassFromMagnetic(magnetic, deviationValue);
	const point = pointName(course);
	const conversion = mode === "variation-deviation";

	return (
		<div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
			<div className="mx-auto w-full max-w-80">
				<RoseDial
					heading={course}
					onHeadingChange={setCourse}
					label={`Ruža kompasa, kurs ${formatCourse(course)}`}
					norths={
						conversion
							? [
									{ label: "pravi", offset: 0, color: PALETTE.navy },
									{
										label: "magnetski",
										offset: variationValue * 3,
										color: PALETTE.sky,
									},
									{
										label: "kompasni",
										offset: (variationValue + deviationValue) * 3,
										color: "#e0322b",
									},
								]
							: []
					}
					track={conversion && drift !== 0 ? course + drift : undefined}
				/>
				{conversion && (
					<p className="mt-1 text-center text-[0.72rem] text-[#002c78]/60">
						Kutovi pogreški su na crtežu povećani tri puta da se vide.
					</p>
				)}
			</div>

			<div className="space-y-4">
				<CourseSlider
					label={conversion ? "Pravi kurs (Kp)" : "Kurs"}
					value={course}
					min={0}
					max={359}
					display={formatCourse(course)}
					onChange={setCourse}
				/>

				{conversion ? (
					<>
						<CourseSlider
							label="Varijacija"
							value={variationValue}
							min={-10}
							max={10}
							display={formatCorrection(variationValue)}
							onChange={setVariation}
						/>
						<CourseSlider
							label="Devijacija"
							value={deviationValue}
							min={-10}
							max={10}
							display={formatCorrection(deviationValue)}
							onChange={setDeviation}
						/>

						<dl className="space-y-1.5 rounded-2xl bg-[#eaf3ff] p-3 font-mono text-[0.85rem]">
							<div className="flex flex-wrap justify-between gap-x-3">
								<dt>Km = Kp - var</dt>
								<dd className="m-0">
									{course} - ({variationValue}) ={" "}
									<strong>{formatCourse(magnetic)}</strong>
								</dd>
							</div>
							<div className="flex flex-wrap justify-between gap-x-3">
								<dt>Kk = Km - dev</dt>
								<dd className="m-0">
									{Math.round(magnetic * 10) / 10} - ({deviationValue}) ={" "}
									<strong className="text-[#b02a22]">
										{formatCourse(compass)}
									</strong>
								</dd>
							</div>
						</dl>
						<p className="text-[0.82rem] leading-relaxed text-[#002c78]/75">
							S karte na kompas oduzimaš, s kompasa na kartu zbrajaš. Istočno
							(E) je plus, zapadno (W) minus. Na ruži: plava crta je magnetski,
							crvena kompasni sjever.
						</p>

						<CourseSlider
							label="Zanos (vjetar ili struja)"
							value={drift}
							min={-20}
							max={20}
							display={
								drift === 0
									? "nema"
									: `${drift > 0 ? "udesno" : "ulijevo"} ${Math.abs(drift)}°`
							}
							onChange={setDrift}
						/>
						{drift !== 0 && (
							<p className="text-[0.82rem] leading-relaxed">
								Isprekidana crta je stvarni put preko dna:{" "}
								<span className="font-mono">
									{formatCourse(course + drift)}
								</span>
								. Da ostaneš na crti s karte, pramac drži za {Math.abs(drift)}°
								na drugu stranu.
							</p>
						)}
					</>
				) : (
					<dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5 rounded-2xl bg-[#eaf3ff] p-3 text-[0.9rem]">
						<dt className="text-[#002c78]/60">Kurs</dt>
						<dd className="m-0 font-mono font-semibold">
							{formatCourse(course)}
						</dd>
						<dt className="text-[#002c78]/60">Smjer</dt>
						<dd className="m-0">
							{point.name} ({point.code})
						</dd>
						<dt className="text-[#002c78]/60">Kvadrant</dt>
						<dd className="m-0">{quadrantName(course)}</dd>
						<dt className="text-[#002c78]/60">Povratni kurs</dt>
						<dd className="m-0 font-mono">
							{formatCourse(reciprocal(course))}
						</dd>
					</dl>
				)}
			</div>
		</div>
	);
}

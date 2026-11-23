import GlassPanel from "@/features/landing/components/glass-panel";
import Speedometer from "@/features/landing/components/speedometer";
import { readiness } from "@/features/landing/constants/landing-content";
import { MUTE, NAVY, OCEAN, SKY } from "@/features/landing/constants/palette";

interface IReadinessSectionProps {
	reduce: boolean;
}

export default function ReadinessSection({ reduce }: IReadinessSectionProps) {
	const value = readiness.sampleValue;
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
				<div>
					<span
						className="font-mono text-[0.78rem] tracking-widest"
						style={{ color: OCEAN }}
					>
						SPREMNOST
					</span>
					<h2 className="mt-2 font-serif text-3xl md:text-4xl">
						{readiness.label}
					</h2>
					<p
						className="mt-4 text-[1rem] leading-relaxed"
						style={{ color: MUTE }}
					>
						Brzinomjer spremnosti raste kako svladavaš područja.{" "}
						{readiness.sublabel}, a aplikacija te vraća na teme na kojima
						griješiš.
					</p>
					<ul className="mt-6 flex flex-wrap gap-2">
						{readiness.badges.map((b) => (
							<li
								key={b.name}
								className="rounded-full border px-3 py-1.5 font-mono text-[0.72rem]"
								style={{ borderColor: "rgba(0,174,243,0.5)", color: OCEAN }}
							>
								{b.name}
							</li>
						))}
					</ul>
				</div>

				<div className="mx-auto w-full max-w-xs">
					<GlassPanel>
						<Speedometer
							value={value}
							track="rgba(0,44,120,0.12)"
							fill={SKY}
							valueColor={NAVY}
							labelColor={OCEAN}
							animated={!reduce}
						/>
					</GlassPanel>
				</div>
			</div>
		</section>
	);
}

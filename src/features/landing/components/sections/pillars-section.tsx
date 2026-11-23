import { motion } from "motion/react";
import GlassPanel from "@/features/landing/components/glass-panel";
import { pillars } from "@/features/landing/constants/landing-content";
import { MUTE, OCEAN } from "@/features/landing/constants/palette";
import { reveal } from "@/features/landing/utils/reveal";

interface IPillarsSectionProps {
	reduce: boolean;
}

export default function PillarsSection({ reduce }: IPillarsSectionProps) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
					Kako te eInstruktor vodi
				</h2>
				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{pillars.map((p) => (
						<motion.div key={p.id} {...reveal(reduce)}>
							<GlassPanel className="h-full">
								<h3 className="font-serif text-2xl">{p.name}</h3>
								<p
									className="mt-1 text-[0.92rem] font-medium"
									style={{ color: OCEAN }}
								>
									{p.tagline}
								</p>
								<p
									className="mt-3 text-[0.94rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									{p.detail}
								</p>
							</GlassPanel>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

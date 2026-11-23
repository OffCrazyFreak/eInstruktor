import { motion } from "motion/react";
import GlassPanel from "@/features/landing/components/glass-panel";
import { procedure } from "@/features/landing/constants/landing-content";
import { MUTE, NAVY, OCEAN, SKY } from "@/features/landing/constants/palette";
import { reveal } from "@/features/landing/utils/reveal";

interface IProcedureSectionProps {
	reduce: boolean;
}

export default function ProcedureSection({ reduce }: IProcedureSectionProps) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="font-serif text-3xl md:text-4xl">Osam koraka do mora</h2>
				<div className="mt-8 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
					{procedure.map((s) => (
						<motion.div
							key={s.n}
							{...reveal(reduce, 18)}
							className="min-w-[220px] md:min-w-0"
						>
							<GlassPanel className="h-full" dark={s.n === 8}>
								<div className="flex items-center gap-2">
									<span
										className="font-serif text-4xl italic"
										style={{ color: s.app ? SKY : OCEAN }}
									>
										{s.n}
									</span>
									{s.app && (
										<span
											className="rounded-full px-2 py-0.5 font-mono text-[0.6rem]"
											style={{ background: SKY, color: NAVY }}
										>
											TU SMO MI
										</span>
									)}
								</div>
								<h3 className="mt-2 text-[1.02rem] font-semibold">{s.title}</h3>
								<p
									className="mt-1 text-[0.88rem]"
									style={{ color: s.n === 8 ? "rgba(234,243,255,0.8)" : MUTE }}
								>
									{s.detail}
								</p>
							</GlassPanel>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

import { motion } from "motion/react";
import GlassPanel from "@/features/landing/components/glass-panel";
import {
	categories,
	factsCheckedOn,
} from "@/features/landing/constants/landing-content";
import { MUTE, NAVY, OCEAN } from "@/features/landing/constants/palette";
import { reveal } from "@/features/landing/utils/reveal";

interface ICategoriesSectionProps {
	reduce: boolean;
}

export default function CategoriesSection({ reduce }: ICategoriesSectionProps) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-5xl">
				<h2 className="font-serif text-3xl md:text-4xl">
					Dvije kategorije, jedno more
				</h2>
				<div className="mt-8 grid gap-6 md:grid-cols-2">
					{categories.map((c, i) => (
						<motion.div
							key={c.code}
							{...reveal(reduce)}
							transition={
								reduce
									? undefined
									: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
							}
						>
							<GlassPanel
								className={c.recommended ? "ring-2 ring-[#00aef3]" : undefined}
							>
								<div className="flex items-baseline justify-between">
									<span
										className="font-serif text-5xl italic"
										style={{ color: c.recommended ? OCEAN : NAVY }}
									>
										{c.code}
									</span>
									<span
										className="font-mono text-[0.76rem]"
										style={{ color: OCEAN }}
									>
										od {c.minAge} godina
									</span>
								</div>
								<h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
								<p
									className="mt-1 text-[0.95rem] font-medium"
									style={{ color: OCEAN }}
								>
									{c.summary}
								</p>
								<p
									className="mt-3 text-[0.94rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									{c.detail}
								</p>
							</GlassPanel>
						</motion.div>
					))}
				</div>
				<p className="mt-5 text-[0.8rem]" style={{ color: MUTE }}>
					Prema Pravilniku o brodicama i jahtama. Propisi se mogu promijeniti.
					Zadnje provjereno {factsCheckedOn}
				</p>
			</div>
		</section>
	);
}

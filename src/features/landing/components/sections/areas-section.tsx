import { motion } from "motion/react";
import areas from "@/content/voditelj-brodice/areas-index";
import { MUTE, OCEAN } from "@/features/landing/constants/palette";
import { reveal } from "@/features/landing/utils/reveal";

interface IAreasSectionProps {
	reduce: boolean;
}

export default function AreasSection({ reduce }: IAreasSectionProps) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-wrap items-end justify-between gap-3">
					<h2 className="font-serif text-3xl md:text-4xl">
						Što sve moraš znati
					</h2>
					<span className="font-mono text-[0.78rem]" style={{ color: OCEAN }}>
						{areas.length} područja gradiva, 5 ispitnih predmeta za B
					</span>
				</div>
				<div className="mt-8 grid gap-3 sm:grid-cols-2">
					{areas.map((a, i) => (
						<motion.div
							key={a.slug}
							{...reveal(reduce, 14)}
							transition={
								reduce
									? undefined
									: {
											duration: 0.55,
											delay: (i % 2) * 0.05,
											ease: [0.16, 1, 0.3, 1],
										}
							}
							className="flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-sm"
							style={{
								background: "rgba(255,255,255,0.6)",
								borderColor: "rgba(0,44,120,0.12)",
							}}
						>
							<span
								className="shrink-0 font-serif text-2xl italic"
								style={{ color: OCEAN }}
							>
								{String(i + 1).padStart(2, "0")}
							</span>
							<div>
								<h3 className="text-[1rem] font-semibold leading-tight">
									{a.title}
								</h3>
								<p className="text-[0.85rem]" style={{ color: MUTE }}>
									{a.summary}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

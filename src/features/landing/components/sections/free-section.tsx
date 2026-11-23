import { motion } from "motion/react";
import FreeChip from "@/features/landing/components/free-chip";
import GlassPanel from "@/features/landing/components/glass-panel";
import {
	costs,
	factsCheckedOn,
	harbours,
} from "@/features/landing/constants/landing-content";
import { MUTE, NAVY, OCEAN } from "@/features/landing/constants/palette";
import { reveal } from "@/features/landing/utils/reveal";

interface IFreeSectionProps {
	reduce: boolean;
}

export default function FreeSection({ reduce }: IFreeSectionProps) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-5xl">
				<motion.div {...reveal(reduce)}>
					<GlassPanel>
						<div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
							<div>
								<h2 className="font-serif text-3xl md:text-4xl">
									Sve je besplatno. Zauvijek.
								</h2>
								<p
									className="mt-3 text-[1rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									Cijela aplikacija radi bez registracije. Prijavom Googleom
									čuvaš napredak i slabe teme na svim uređajima, jednim klikom i
									bez lozinke.
								</p>
								<div className="mt-5 flex flex-wrap gap-3">
									<FreeChip />
									<span
										className="font-mono text-[0.76rem]"
										style={{ color: OCEAN }}
									>
										bez oglasa / bez paywalla
									</span>
								</div>
							</div>
							<ul className="space-y-2 text-[0.94rem]">
								{costs.map((c) => (
									<li
										key={c.label}
										className="flex items-center justify-between gap-4 border-b pb-2"
										style={{ borderColor: "rgba(0,44,120,0.12)" }}
									>
										<span>{c.label}</span>
										<span
											className="shrink-0 whitespace-nowrap font-mono text-[0.85rem]"
											style={{ color: NAVY }}
										>
											{c.range}
										</span>
									</li>
								))}
								<li
									className="pt-1 text-[0.8rem]"
									style={{ color: "rgba(0,44,120,0.6)" }}
								>
									Iznosi su okvirni i mogu se promijeniti, posebno nakon
									01.01.2027. kad se očekuju nova pravila. Zadnje provjereno{" "}
									{factsCheckedOn}
								</li>
							</ul>
						</div>
						<div
							className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.76rem]"
							style={{ color: MUTE }}
						>
							{harbours.map((h) => (
								<span key={h.name}>{h.name}</span>
							))}
						</div>
					</GlassPanel>
				</motion.div>
			</div>
		</section>
	);
}

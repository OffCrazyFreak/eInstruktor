import { motion } from "motion/react";
import GlassPanel from "@/features/landing/components/glass-panel";
import { MUTE, OCEAN } from "@/features/landing/constants/palette";
import { reveal } from "@/features/landing/utils/reveal";

interface IIntroSectionProps {
	reduce: boolean;
}

export default function IntroSection({ reduce }: IIntroSectionProps) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
				<motion.h2
					{...reveal(reduce)}
					className="font-serif text-3xl leading-snug md:text-[2.6rem]"
				>
					Dozvola nije papir. To je ljeto u kojem sam
					<span style={{ color: OCEAN }}> upravljaš</span> brodom.
				</motion.h2>
				<motion.div {...reveal(reduce)}>
					<GlassPanel>
						<p className="text-[1rem] leading-relaxed" style={{ color: MUTE }}>
							Za voditelja brodice ne treba talent, nego malo reda. Podijelimo
							gradivo na male dijelove, vježbamo tvoje slabe točke i simuliramo
							pravi ispit. Ostalo je uživanje na moru.
						</p>
					</GlassPanel>
				</motion.div>
			</div>
		</section>
	);
}

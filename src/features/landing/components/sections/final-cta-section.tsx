import FreeChip from "@/features/landing/components/free-chip";
import GlassPanel from "@/features/landing/components/glass-panel";
import LandingCtas from "@/features/landing/components/landing-ctas";
import { SKY } from "@/features/landing/constants/palette";

export default function FinalCtaSection() {
	return (
		<section id="pocni" className="relative px-5 py-16 md:px-12">
			<div className="mx-auto max-w-3xl text-center">
				<GlassPanel dark className="px-8 py-12">
					<h2 className="font-serif text-4xl leading-tight md:text-5xl">
						More te zove.{" "}
						<span className="italic" style={{ color: SKY }}>
							Tvoje ljeto počinje.
						</span>
					</h2>
					<p
						className="mx-auto mt-4 max-w-lg text-[1.05rem]"
						style={{ color: "rgba(234,243,255,0.85)" }}
					>
						Počni večeras, bez registracije. Do kraja tjedna možeš biti spreman
						za izlazak na more.
					</p>
					<div className="mt-8 flex justify-center">
						<LandingCtas onDark />
					</div>
					<div className="mt-6 flex justify-center">
						<FreeChip onDark />
					</div>
				</GlassPanel>
			</div>
		</section>
	);
}

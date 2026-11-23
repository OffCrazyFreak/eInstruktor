import FreeChip from "@/features/landing/components/free-chip";
import LandingCtas from "@/features/landing/components/landing-ctas";
import Sailboat from "@/features/landing/components/sailboat";
import { cta } from "@/features/landing/constants/landing-content";
import { MUTE, OCEAN } from "@/features/landing/constants/palette";

interface IHeroSectionProps {
	reduce: boolean;
}

export default function HeroSection({ reduce }: IHeroSectionProps) {
	return (
		<section className="relative flex min-h-svh flex-col justify-center px-5 pt-24 pb-10 md:px-12">
			<div className="mx-auto w-full max-w-6xl">
				<p
					className="font-mono text-[0.76rem] tracking-[0.24em]"
					style={{ color: OCEAN }}
				>
					VODITELJ BRODICE / TVOJE LJETO NA MORU
				</p>
				<h1 className="mt-4 max-w-4xl font-serif text-[2.7rem] leading-[1.02] sm:text-6xl md:text-7xl">
					Zaplovi mirno,
					<br />
					<span className="italic" style={{ color: OCEAN }}>
						stigni spremno
					</span>{" "}
					u luku.
				</h1>
				<p
					className="mt-6 max-w-lg text-[1.1rem] leading-relaxed"
					style={{ color: MUTE }}
				>
					eInstruktor te vodi kroz cijeli ispit za voditelja brodice, mirno i
					jasno, od vedrog jutra do zvjezdane noći. Dok sunce prelazi nebo, ti
					postaješ spreman.
				</p>
				<div className="mt-9">
					<LandingCtas />
				</div>
				<div className="mt-6 flex flex-wrap items-center gap-3">
					<FreeChip />
					<span className="text-[0.86rem]" style={{ color: MUTE }}>
						{cta.freeNote}
					</span>
				</div>
			</div>
			<Sailboat
				reduce={reduce}
				className="absolute bottom-10 right-6 w-24 opacity-80 md:right-24 md:w-32"
			/>
		</section>
	);
}

import { useReducedMotion, useScroll } from "motion/react";
import AreasSection from "@/features/landing/components/sections/areas-section";
import CategoriesSection from "@/features/landing/components/sections/categories-section";
import FaqSection from "@/features/landing/components/sections/faq-section";
import FinalCtaSection from "@/features/landing/components/sections/final-cta-section";
import FreeSection from "@/features/landing/components/sections/free-section";
import HeroSection from "@/features/landing/components/sections/hero-section";
import IntroSection from "@/features/landing/components/sections/intro-section";
import PillarsSection from "@/features/landing/components/sections/pillars-section";
import ProcedureSection from "@/features/landing/components/sections/procedure-section";
import QuoteSection from "@/features/landing/components/sections/quote-section";
import ReadinessSection from "@/features/landing/components/sections/readiness-section";
import Moon from "@/features/landing/components/sky/moon";
import SkyGradient from "@/features/landing/components/sky/sky-gradient";
import StarField from "@/features/landing/components/sky/star-field";
import Sun from "@/features/landing/components/sky/sun";
import { NAVY } from "@/features/landing/constants/palette";

/**
 * The "Zlatni sat" landing concept.
 * A live sky that starts pure white and light blue and, as you scroll, dives
 * into deep navy. A warm sun crosses left to right and sets behind the right
 * edge; once it is dark a moon rises on the left and crosses too.
 */
export default function LandingPage() {
	const reduce = !!useReducedMotion();
	const { scrollYProgress } = useScroll();

	return (
		<div
			className="relative min-h-svh overflow-hidden font-sans"
			style={{ color: NAVY }}
		>
			<SkyGradient reduce={reduce} scrollYProgress={scrollYProgress} />
			<StarField reduce={reduce} scrollYProgress={scrollYProgress} />
			<Sun reduce={reduce} scrollYProgress={scrollYProgress} />
			{!reduce && <Moon scrollYProgress={scrollYProgress} />}

			<HeroSection reduce={reduce} />
			<IntroSection reduce={reduce} />
			<CategoriesSection reduce={reduce} />
			<ProcedureSection reduce={reduce} />
			<AreasSection reduce={reduce} />
			<PillarsSection reduce={reduce} />
			<ReadinessSection reduce={reduce} />
			<FreeSection reduce={reduce} />
			<QuoteSection />
			<FaqSection />
			<FinalCtaSection />
		</div>
	);
}

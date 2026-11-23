import LandingFaq from "@/features/landing/components/landing-faq";
import { LIGHT } from "@/features/landing/constants/palette";

export default function FaqSection() {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-3xl">
				<h2
					className="font-serif text-3xl md:text-4xl"
					style={{ color: LIGHT }}
				>
					Česta pitanja
				</h2>
				<LandingFaq dark />
			</div>
		</section>
	);
}

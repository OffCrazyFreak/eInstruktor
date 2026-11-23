import { quote } from "@/features/landing/constants/landing-content";
import { LIGHT } from "@/features/landing/constants/palette";

export default function QuoteSection() {
	return (
		<section className="relative px-5 py-16 md:px-12">
			<div className="mx-auto max-w-3xl text-center">
				<blockquote
					className="font-serif text-2xl italic leading-snug sm:text-3xl md:text-4xl"
					style={{ color: LIGHT }}
				>
					&ldquo;{quote}&rdquo;
				</blockquote>
				<p
					className="mt-5 font-mono text-[0.76rem] tracking-widest"
					style={{ color: "rgba(234,243,255,0.7)" }}
				>
					JADRANSKA MUDROST
				</p>
			</div>
		</section>
	);
}

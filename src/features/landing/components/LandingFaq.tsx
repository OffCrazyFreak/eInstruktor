import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/features/landing/content";
import { cn } from "@/lib/utils";

/** FAQ built on the shadcn Accordion, themed light or dark per concept. */
export function LandingFaq({ dark }: { dark?: boolean }) {
	return (
		<Accordion type="single" collapsible className="mt-8 w-full space-y-3">
			{faqs.map((f, i) => (
				<AccordionItem
					key={f.q}
					value={`faq-${i}`}
					className={cn(
						"rounded-2xl border px-5 backdrop-blur-md",
						dark
							? "border-[#b4d6ff]/16 bg-[#04122c]/50 text-[#eaf3ff]"
							: "border-[#002c78]/14 bg-white/80",
					)}
				>
					<AccordionTrigger className="py-4 text-left text-[1.02rem] font-semibold hover:no-underline">
						{f.q}
					</AccordionTrigger>
					<AccordionContent
						className={cn(
							"text-[0.94rem] leading-relaxed",
							dark ? "text-[#eaf3ff]/82" : "text-[#002c78]/72",
						)}
					>
						{f.a}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

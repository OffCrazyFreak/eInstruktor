import type { ReactNode } from "react";

interface ILegalSectionProps {
	title: string;
	children: ReactNode;
}

export default function LegalSection({ title, children }: ILegalSectionProps) {
	return (
		<section className="border-t border-[#002c78]/10 pt-7">
			<h2 className="font-serif text-xl text-[#002c78] md:text-2xl">{title}</h2>
			<div className="mt-3 space-y-3 text-[0.98rem] leading-relaxed text-[#002c78]/80 [&_a]:font-medium [&_a]:text-[#0a63b0] [&_a]:underline [&_a]:underline-offset-2 [&_li]:pl-1 [&_strong]:text-[#002c78] [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
				{children}
			</div>
		</section>
	);
}

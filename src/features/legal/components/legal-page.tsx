import type { ReactNode } from "react";
import {
	CONTACT_URL,
	LEGAL_UPDATED_ON,
} from "@/features/legal/constants/legal";

interface ILegalPageProps {
	eyebrow: string;
	title: string;
	summary: string[];
	children: ReactNode;
}

export default function LegalPage({
	eyebrow,
	title,
	summary,
	children,
}: ILegalPageProps) {
	return (
		<main className="min-h-svh bg-background px-5 pt-28 pb-20 text-ink md:px-8 md:pt-32">
			<article className="mx-auto max-w-2xl">
				<p className="font-mono text-[0.74rem] tracking-[0.22em] text-ocean">
					{eyebrow}
				</p>
				<h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
					{title}
				</h1>
				<p className="mt-3 text-sm text-ink/65">
					Zadnja izmjena {LEGAL_UPDATED_ON}
				</p>

				<div className="mt-8 rounded-2xl border border-[#00aef3]/35 bg-tint p-6">
					<h2 className="text-sm font-semibold tracking-wide text-ocean">
						Ukratko
					</h2>
					<ul className="mt-3 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed">
						{summary.map((point) => (
							<li key={point}>{point}</li>
						))}
					</ul>
				</div>

				<div className="mt-10 space-y-9">{children}</div>

				<p className="mt-12 border-t border-ink/10 pt-6 text-[0.95rem] text-ink/80">
					Kontakt: putem{" "}
					<a
						href={CONTACT_URL}
						target="_blank"
						rel="noreferrer"
						className="font-medium text-ocean underline underline-offset-2"
					>
						GitHub repozitorija
					</a>
				</p>
			</article>
		</main>
	);
}

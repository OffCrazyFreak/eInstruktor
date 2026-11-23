import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import FloatingDuck from "@/components/custom/layout/floating-duck";
import FooterWaves from "@/components/custom/layout/footer-waves";
import { GithubIcon, type GithubIconHandle } from "@/components/ui/github-icon";
import {
	LinkedinIcon,
	type LinkedinIconHandle,
} from "@/components/ui/linkedin-icon";

export default function Footer() {
	const year = new Date().getFullYear();
	const linkedinRef = useRef<LinkedinIconHandle>(null);
	const githubRef = useRef<GithubIconHandle>(null);

	return (
		<footer className="relative overflow-hidden border-t border-border bg-background px-4 pt-1.5 pb-5 sm:pb-1.5">
			<FooterWaves />
			<FloatingDuck />
			<div className="page-wrap relative z-10 flex items-center justify-between gap-4 text-xs text-muted-foreground">
				<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
					<p>eInstruktor © Jakov Jakovac {year}</p>
					<nav aria-label="Pravne stranice" className="flex gap-3">
						<Link
							to="/privatnost"
							className="-my-1 rounded-sm py-1 text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
						>
							Privatnost
						</Link>
						<Link
							to="/uvjeti"
							className="-my-1 rounded-sm py-1 text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
						>
							Uvjeti
						</Link>
					</nav>
				</div>
				<div className="flex items-center gap-0.5">
					<a
						href="https://www.linkedin.com/in/jakov-jakovac/"
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
						className="inline-flex cursor-pointer rounded-md p-1 transition-colors hover:bg-accent hover:text-foreground"
						onMouseEnter={() => linkedinRef.current?.startAnimation()}
						onMouseLeave={() => linkedinRef.current?.stopAnimation()}
						onFocus={() => linkedinRef.current?.startAnimation()}
						onBlur={() => linkedinRef.current?.stopAnimation()}
					>
						<LinkedinIcon
							ref={linkedinRef}
							size={16}
							className="pointer-events-none"
						/>
					</a>
					<a
						href="https://github.com/OffCrazyFreak/eInstruktor"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						className="inline-flex cursor-pointer rounded-md p-1 transition-colors hover:bg-accent hover:text-foreground"
						onMouseEnter={() => githubRef.current?.startAnimation()}
						onMouseLeave={() => githubRef.current?.stopAnimation()}
						onFocus={() => githubRef.current?.startAnimation()}
						onBlur={() => githubRef.current?.stopAnimation()}
					>
						<GithubIcon
							ref={githubRef}
							size={16}
							className="pointer-events-none"
						/>
					</a>
				</div>
			</div>
		</footer>
	);
}

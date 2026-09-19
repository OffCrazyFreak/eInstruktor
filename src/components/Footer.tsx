import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
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
		<footer className="relative overflow-hidden border-t border-border bg-background px-4 py-1.5">
			<FooterWaves />
			<FloatingDuck />
			<div className="page-wrap relative z-10 flex items-center justify-between gap-4 text-xs text-muted-foreground">
				<p>eInstruktor © Jakov Jakovac {year}</p>
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

function FooterWaves() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.svg
			viewBox="0 0 1440 60"
			preserveAspectRatio="none"
			className="pointer-events-none absolute bottom-0 -left-[15%] z-0 h-5 w-[130%] text-primary"
			aria-hidden="true"
			animate={reduceMotion ? undefined : { x: [0, -30, 0] }}
			transition={{
				duration: 7,
				ease: "easeInOut",
				repeat: Number.POSITIVE_INFINITY,
			}}
		>
			<path
				d="M0 30 C 240 8 430 48 720 28 S 1220 6 1440 32 L1440 60 L0 60 Z"
				fill="currentColor"
				opacity="0.18"
			/>
			<path
				d="M0 40 C 260 18 440 56 760 38 S 1240 18 1440 42 L1440 60 L0 60 Z"
				fill="currentColor"
				opacity="0.3"
			/>
		</motion.svg>
	);
}

function FloatingDuck() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className="pointer-events-none absolute bottom-0.5 z-[5]"
			aria-hidden="true"
			style={{ left: "8%" }}
			animate={
				reduceMotion
					? undefined
					: {
							// wander: drift, pause, turn around, drift back
							left: [
								"8%",
								"34%",
								"34%",
								"34%",
								"18%",
								"18%",
								"18%",
								"56%",
								"56%",
								"80%",
								"80%",
								"80%",
								"8%",
								"8%",
								"8%",
							],
							// face travel direction (flips while paused)
							scaleX: [1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, 1],
						}
			}
			transition={{
				duration: 140,
				ease: "easeInOut",
				times: [
					0, 0.12, 0.16, 0.2, 0.32, 0.36, 0.4, 0.54, 0.6, 0.72, 0.76, 0.8, 0.92,
					0.96, 1,
				],
				repeat: Number.POSITIVE_INFINITY,
			}}
		>
			<motion.svg
				width="24"
				height="20"
				viewBox="0 0 40 34"
				animate={
					reduceMotion ? undefined : { y: [0, -5, 0], rotate: [-6, 6, -6] }
				}
				transition={{
					duration: 3.6,
					ease: "easeInOut",
					repeat: Number.POSITIVE_INFINITY,
				}}
			>
				<ellipse cx="19" cy="22" rx="13" ry="8" fill="#f4c531" />
				<path d="M13 20 Q19 15 25 21 Q19 25 13 20 Z" fill="#e0ad1f" />
				<circle cx="29" cy="13" r="6.5" fill="#f4c531" />
				<path d="M34 13 L41 15 L34 17 Z" fill="#ef8a3a" />
				<circle cx="30" cy="11.5" r="1.3" fill="#22324f" />
			</motion.svg>
		</motion.div>
	);
}

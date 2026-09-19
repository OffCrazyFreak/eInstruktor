import {
	motion,
	useMotionTemplate,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";
import { Card } from "@/components/ui/card";
import { FreeChip } from "@/features/landing/components/FreeChip";
import { LandingCtas } from "@/features/landing/components/LandingCtas";
import { LandingFaq } from "@/features/landing/components/LandingFaq";
import {
	categories,
	costs,
	examAreas,
	harbours,
	pillars,
	procedure,
	quotes,
	readiness,
} from "@/features/landing/content";
import { Speedometer } from "@/features/landing/illustrations/Speedometer";
import { cn } from "@/lib/utils";

/**
 * Concept 3 - Zlatni sat.
 * A live sky that starts pure white and light blue and, as you scroll, dives
 * into deep navy. A warm sun crosses left to right and sets behind the right
 * edge; once it is dark a moon rises on the left and crosses too.
 */

const NAVY = "#002c78";
const SKY = "#00aef3";
const OCEAN = "#0a63b0";
const LIGHT = "#eaf3ff";
const MUTE = "rgba(0,44,120,0.76)";

export function ZlatniSat() {
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll();

	const topStop = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		["#ffffff", "#cfe8fb", "#04142e"],
	);
	const midStop = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		["#eaf6ff", "#8cc2ee", "#061a3a"],
	);
	const botStop = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		["#dcefff", "#3f8fca", "#020e24"],
	);
	const sky = useMotionTemplate`linear-gradient(180deg, ${topStop} 0%, ${midStop} 48%, ${botStop} 100%)`;

	// sun starts in frame on the left, crosses right and fully sets behind the
	// right edge well before the end (138% clears the disc + glow on mobile too)
	const sunX = useTransform(scrollYProgress, [0, 0.6], ["10%", "150%"]);
	const sunY = useTransform(
		scrollYProgress,
		[0, 0.18, 0.386, 0.6],
		["24vh", "10vh", "62vh", "95vh"],
	);

	// moon rises on the left once it is dark and settles in frame on the right
	const moonX = useTransform(scrollYProgress, [0.5, 1], ["58%", "86%"]);
	const moonY = useTransform(
		scrollYProgress,
		[0.5, 0.78, 1],
		["46vh", "24vh", "22vh"],
	);
	const moonOpacity = useTransform(scrollYProgress, [0.42, 0.54, 1], [0, 1, 1]);
	const starOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);

	return (
		<div
			className="relative min-h-svh overflow-hidden font-sans"
			style={{ color: NAVY }}
		>
			{/* live sky */}
			{reduce ? (
				<div
					aria-hidden="true"
					className="fixed inset-0 -z-20"
					style={{
						background: "linear-gradient(180deg,#ffffff,#cfe8fb 48%,#dcefff)",
					}}
				/>
			) : (
				<motion.div
					aria-hidden="true"
					className="fixed inset-0 -z-20"
					style={{ background: sky }}
				/>
			)}

			{/* stars for the deep */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed inset-0 -z-10"
				style={{ opacity: reduce ? 0 : starOpacity }}
			>
				{Array.from({ length: 40 }, (_, i) => ({
					x: (i * 53.7) % 100,
					y: (i * 29.3) % 60,
					s: (i % 3) + 1,
				})).map((star) => (
					<span
						key={`${star.x}-${star.y}`}
						className="absolute rounded-full bg-white"
						style={{
							left: `${star.x}%`,
							top: `${star.y}%`,
							width: star.s,
							height: star.s,
							opacity: 0.9,
						}}
					/>
				))}
			</motion.div>

			{/* the warm sun, crossing left to right and setting behind the right edge */}
			{reduce ? (
				<div
					aria-hidden="true"
					className="pointer-events-none fixed -z-10"
					style={{
						left: "20%",
						top: "16vh",
						transform: "translate(-50%,-50%)",
					}}
				>
					<div
						className="h-40 w-40 rounded-full"
						style={{
							background:
								"radial-gradient(circle at 50% 45%, #ffe89a, #ffb43c)",
							boxShadow: "0 0 110px 50px rgba(255,190,90,0.55)",
						}}
					/>
				</div>
			) : (
				<motion.div
					aria-hidden="true"
					className="pointer-events-none fixed -z-10"
					style={{ left: sunX, top: sunY, x: "-50%", y: "-50%" }}
				>
					<div
						className="h-44 w-44 rounded-full"
						style={{
							background:
								"radial-gradient(circle at 50% 45%, #ffe89a, #ffb43c)",
							boxShadow: "0 0 120px 56px rgba(255,190,90,0.55)",
						}}
					/>
				</motion.div>
			)}

			{/* the moon, rising on the left once it is dark */}
			{!reduce && (
				<motion.div
					aria-hidden="true"
					className="pointer-events-none fixed -z-10"
					style={{
						left: moonX,
						top: moonY,
						x: "-50%",
						y: "-50%",
						opacity: moonOpacity,
					}}
				>
					<div
						className="relative h-28 w-28 rounded-full"
						style={{
							background:
								"radial-gradient(circle at 42% 40%, #ffffff, #cdd9f2)",
							boxShadow: "0 0 70px 26px rgba(200,220,255,0.45)",
						}}
					>
						<span
							className="absolute rounded-full"
							style={{
								left: "58%",
								top: "30%",
								width: 14,
								height: 14,
								background: "rgba(120,150,200,0.22)",
							}}
						/>
						<span
							className="absolute rounded-full"
							style={{
								left: "34%",
								top: "58%",
								width: 9,
								height: 9,
								background: "rgba(120,150,200,0.2)",
							}}
						/>
					</div>
				</motion.div>
			)}

			<SatHero reduce={!!reduce} />
			<SatIntro reduce={!!reduce} />
			<SatCategories reduce={!!reduce} />
			<SatProcedure reduce={!!reduce} />
			<SatAreas reduce={!!reduce} />
			<SatPillars reduce={!!reduce} />
			<SatReadiness reduce={!!reduce} />
			<SatFree reduce={!!reduce} />
			<SatQuote />
			<SatFaq />
			<SatFinalCta />
		</div>
	);
}

function reveal(reduce: boolean, y = 26) {
	if (reduce) return {};
	return {
		initial: { opacity: 0, y },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, margin: "-80px" },
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
	};
}

/** Translucent panel built on the shadcn Card so text stays legible over the sky. */
function Glass({
	children,
	className,
	dark,
}: {
	children: React.ReactNode;
	className?: string;
	dark?: boolean;
}) {
	return (
		<Card
			className={cn(
				"block rounded-[var(--radius)] border p-7 shadow-none backdrop-blur-md",
				className,
			)}
			style={
				dark
					? {
							background: "rgba(4,18,44,0.55)",
							borderColor: "rgba(180,214,255,0.16)",
							color: LIGHT,
						}
					: {
							background: "rgba(255,255,255,0.68)",
							borderColor: "rgba(0,44,120,0.12)",
						}
			}
		>
			{children}
		</Card>
	);
}

function Sailboat({
	reduce,
	className,
}: {
	reduce: boolean;
	className?: string;
}) {
	return (
		<motion.svg
			viewBox="0 0 120 90"
			className={className}
			aria-hidden="true"
			initial={reduce ? false : { x: -30 }}
			animate={reduce ? undefined : { x: [-14, 14, -14], y: [0, -4, 0] }}
			transition={
				reduce
					? undefined
					: { duration: 8, repeat: Infinity, ease: "easeInOut" }
			}
		>
			<path d="M20 66 L100 66 L88 78 L32 78 Z" fill={NAVY} />
			<path d="M60 10 L60 62 L26 62 Z" fill={NAVY} />
			<path d="M64 20 L64 62 L92 62 Z" fill={OCEAN} opacity="0.85" />
			<line x1="60" y1="8" x2="60" y2="66" stroke={NAVY} strokeWidth="2" />
		</motion.svg>
	);
}

function SatHero({ reduce }: { reduce: boolean }) {
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
						Bez registracije. Napredak i slabe teme prati anonimno.
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

function SatIntro({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
				<motion.h2
					{...reveal(reduce)}
					className="font-serif text-3xl leading-snug md:text-[2.6rem]"
				>
					Dozvola nije papir. To je ljeto u kojem sam
					<span style={{ color: OCEAN }}> upravljaš</span> brodom.
				</motion.h2>
				<motion.div {...reveal(reduce)}>
					<Glass>
						<p className="text-[1rem] leading-relaxed" style={{ color: MUTE }}>
							Za voditelja brodice ne treba talent, nego malo reda. Podijelimo
							gradivo na male dijelove, vježbamo tvoje slabe točke i simuliramo
							pravi ispit. Ostalo je uživanje na moru.
						</p>
					</Glass>
				</motion.div>
			</div>
		</section>
	);
}

function SatCategories({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-5xl">
				<h2 className="font-serif text-3xl md:text-4xl">
					Dvije kategorije, jedno more
				</h2>
				<div className="mt-8 grid gap-6 md:grid-cols-2">
					{categories.map((c, i) => (
						<motion.div
							key={c.code}
							{...reveal(reduce)}
							transition={
								reduce
									? undefined
									: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
							}
						>
							<Glass
								className={c.recommended ? "ring-2 ring-[#00aef3]" : undefined}
							>
								<div className="flex items-baseline justify-between">
									<span
										className="font-serif text-5xl italic"
										style={{ color: c.recommended ? OCEAN : NAVY }}
									>
										{c.code}
									</span>
									<span
										className="font-mono text-[0.76rem]"
										style={{ color: OCEAN }}
									>
										od {c.minAge} godina
									</span>
								</div>
								<h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
								<p
									className="mt-1 text-[0.95rem] font-medium"
									style={{ color: OCEAN }}
								>
									{c.summary}
								</p>
								<p
									className="mt-3 text-[0.94rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									{c.detail}
								</p>
							</Glass>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function SatProcedure({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="font-serif text-3xl md:text-4xl">Osam koraka do mora</h2>
				<div className="mt-8 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
					{procedure.map((s) => (
						<motion.div
							key={s.n}
							{...reveal(reduce, 18)}
							className="min-w-[220px] md:min-w-0"
						>
							<Glass className="h-full" dark={s.n === 8}>
								<div className="flex items-center gap-2">
									<span
										className="font-serif text-4xl italic"
										style={{ color: s.app ? SKY : OCEAN }}
									>
										{s.n}
									</span>
									{s.app && (
										<span
											className="rounded-full px-2 py-0.5 font-mono text-[0.6rem]"
											style={{ background: SKY, color: NAVY }}
										>
											TU SMO MI
										</span>
									)}
								</div>
								<h3 className="mt-2 text-[1.02rem] font-semibold">{s.title}</h3>
								<p
									className="mt-1 text-[0.88rem]"
									style={{ color: s.n === 8 ? "rgba(234,243,255,0.8)" : MUTE }}
								>
									{s.detail}
								</p>
							</Glass>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function SatAreas({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-wrap items-end justify-between gap-3">
					<h2 className="font-serif text-3xl md:text-4xl">
						Što sve moraš znati
					</h2>
					<span className="font-mono text-[0.78rem]" style={{ color: OCEAN }}>
						8 područja ispita
					</span>
				</div>
				<div className="mt-8 grid gap-3 sm:grid-cols-2">
					{examAreas.map((a, i) => (
						<motion.div
							key={a.id}
							{...reveal(reduce, 14)}
							transition={
								reduce
									? undefined
									: {
											duration: 0.55,
											delay: (i % 2) * 0.05,
											ease: [0.16, 1, 0.3, 1],
										}
							}
							className="flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-sm"
							style={{
								background: "rgba(255,255,255,0.6)",
								borderColor: "rgba(0,44,120,0.12)",
							}}
						>
							<span
								className="font-serif text-2xl italic"
								style={{ color: OCEAN }}
							>
								{String(i + 1).padStart(2, "0")}
							</span>
							<div>
								<h3 className="text-[1rem] font-semibold leading-tight">
									{a.name}
								</h3>
								<p className="text-[0.85rem]" style={{ color: MUTE }}>
									{a.blurb}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function SatPillars({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
					Kako te eInstruktor vodi
				</h2>
				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{pillars.map((p) => (
						<motion.div key={p.id} {...reveal(reduce)}>
							<Glass className="h-full">
								<h3 className="font-serif text-2xl">{p.name}</h3>
								<p
									className="mt-1 text-[0.92rem] font-medium"
									style={{ color: OCEAN }}
								>
									{p.tagline}
								</p>
								<p
									className="mt-3 text-[0.94rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									{p.detail}
								</p>
							</Glass>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function SatReadiness({ reduce }: { reduce: boolean }) {
	const value = readiness.sampleValue;
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
				<div>
					<span
						className="font-mono text-[0.78rem] tracking-widest"
						style={{ color: OCEAN }}
					>
						SPREMNOST
					</span>
					<h2 className="mt-2 font-serif text-3xl md:text-4xl">
						{readiness.label}
					</h2>
					<p
						className="mt-4 text-[1rem] leading-relaxed"
						style={{ color: MUTE }}
					>
						Brzinomjer spremnosti raste kako svladavaš područja.{" "}
						{readiness.sublabel}, a aplikacija te vraća na teme na kojima
						griješiš.
					</p>
					<ul className="mt-6 flex flex-wrap gap-2">
						{readiness.badges.map((b) => (
							<li
								key={b.name}
								className="rounded-full border px-3 py-1.5 font-mono text-[0.72rem]"
								style={{ borderColor: "rgba(0,174,243,0.5)", color: OCEAN }}
							>
								{b.name}
							</li>
						))}
					</ul>
				</div>

				<div className="mx-auto w-full max-w-xs">
					<Glass>
						<Speedometer
							value={value}
							track="rgba(0,44,120,0.12)"
							fill={SKY}
							valueColor={NAVY}
							labelColor={OCEAN}
							animated={!reduce}
						/>
					</Glass>
				</div>
			</div>
		</section>
	);
}

function SatFree({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-12">
			<div className="mx-auto max-w-5xl">
				<motion.div {...reveal(reduce)}>
					<Glass>
						<div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
							<div>
								<h2 className="font-serif text-3xl md:text-4xl">
									Sve je besplatno. Zauvijek.
								</h2>
								<p
									className="mt-3 text-[1rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									Cijela aplikacija radi bez registracije. Prijavom Googleom
									čuvaš napredak i slabe teme na svim uređajima, jednim klikom i
									bez lozinke.
								</p>
								<div className="mt-5 flex flex-wrap gap-3">
									<FreeChip />
									<span
										className="font-mono text-[0.76rem]"
										style={{ color: OCEAN }}
									>
										bez oglasa / bez paywalla
									</span>
								</div>
							</div>
							<ul className="space-y-2 text-[0.94rem]">
								{costs.map((c) => (
									<li
										key={c.label}
										className="flex items-center justify-between border-b pb-2"
										style={{ borderColor: "rgba(0,44,120,0.12)" }}
									>
										<span>{c.label}</span>
										<span
											className="font-mono text-[0.85rem]"
											style={{ color: NAVY }}
										>
											{c.range}
										</span>
									</li>
								))}
								<li
									className="pt-1 text-[0.8rem]"
									style={{ color: "rgba(0,44,120,0.6)" }}
								>
									Iznosi su okvirni i mijenjaju se. Provjeri službeni izvor.
								</li>
							</ul>
						</div>
						<div
							className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.76rem]"
							style={{ color: MUTE }}
						>
							{harbours.map((h) => (
								<span key={h.name}>{h.name}</span>
							))}
						</div>
					</Glass>
				</motion.div>
			</div>
		</section>
	);
}

function SatQuote() {
	return (
		<section className="relative px-5 py-16 md:px-12">
			<div className="mx-auto max-w-3xl text-center">
				<blockquote
					className="font-serif text-2xl italic leading-snug sm:text-3xl md:text-4xl"
					style={{ color: LIGHT }}
				>
					&ldquo;{quotes.sat}&rdquo;
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

function SatFaq() {
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

function SatFinalCta() {
	return (
		<section id="pocni" className="relative px-5 py-16 md:px-12">
			<div className="mx-auto max-w-3xl text-center">
				<Glass dark className="px-8 py-12">
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
				</Glass>
			</div>
		</section>
	);
}

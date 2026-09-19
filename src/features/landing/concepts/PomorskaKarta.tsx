import {
	animate,
	motion,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { FreeChip } from "@/features/landing/components/FreeChip";
import { LandingCtas } from "@/features/landing/components/LandingCtas";
import { LandingFaq } from "@/features/landing/components/LandingFaq";
import {
	categories,
	costs,
	cta,
	examAreas,
	harbours,
	pillars,
	procedure,
	quotes,
	readiness,
} from "@/features/landing/content";
import { Speedometer } from "@/features/landing/illustrations/Speedometer";

/**
 * Concept 1 - Pomorska karta.
 * The page is a passage plan: the boat sails the plotted course automatically
 * (on a loop), tracing the exact line via getPointAtLength. Sections flow on one
 * continuous chart background. Brand blues only: navy, sky blue, white.
 */

const NAVY = "#002c78";
const SKY = "#00aef3";
const OCEAN = "#0a63b0";
const PAPER = "#ffffff";
const MUTE = "rgba(0,44,120,0.68)";

const COURSE_D =
	"M 60 430 C 210 470, 300 320, 430 340 S 660 300, 720 216 S 890 196, 944 150";

/** Labels for the five sampled waypoints along the course. */
const WP_LABELS = ["START", "UČI", "PRIJAVI", "POLOŽI", "ZAPLOVI"];

type Pt = { x: number; y: number };

export function PomorskaKarta() {
	const reduce = useReducedMotion();

	return (
		<div
			className="relative min-h-svh overflow-hidden font-sans"
			style={{ color: NAVY }}
		>
			<PageBackdrop />
			<KartaHero reduce={!!reduce} />
			<KartaCategories reduce={!!reduce} />
			<KartaHarbours reduce={!!reduce} />
			<KartaAreas reduce={!!reduce} />
			<KartaProcedure reduce={!!reduce} />
			<KartaPillars reduce={!!reduce} />
			<KartaReadiness reduce={!!reduce} />
			<KartaQuote />
			<KartaFaqSection />
			<KartaFinalCta />
		</div>
	);
}

function reveal(reduce: boolean, y = 24) {
	if (reduce) return {};
	return {
		initial: { opacity: 0, y },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, margin: "-80px" },
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
	};
}

/** One continuous chart surface + lat/long grid so sections flow together. */
function PageBackdrop() {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(1000px 560px at 85% 0%, rgba(0,174,243,0.1), transparent 60%), radial-gradient(900px 520px at 0% 45%, rgba(0,44,120,0.05), transparent 55%), linear-gradient(180deg, #f7fbff 0%, #eaf3fd 50%, #f4f9fe 100%)",
				}}
			/>
			<svg
				width="100%"
				height="100%"
				aria-hidden="true"
				className="absolute inset-0"
			>
				<defs>
					<pattern
						id="pk-grid"
						width="46"
						height="46"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 46 0 L 0 0 0 46"
							fill="none"
							stroke={NAVY}
							strokeWidth="0.5"
							opacity="0.06"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#pk-grid)" />
			</svg>
		</div>
	);
}

function CompassRose({
	size = 200,
	animated,
}: {
	size?: number;
	animated: boolean;
}) {
	const rays = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2);
	return (
		<svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
			<g transform="translate(100 100)">
				<motion.g
					animate={animated ? { rotate: 360 } : undefined}
					transition={
						animated
							? { duration: 160, repeat: Infinity, ease: "linear" }
							: undefined
					}
				>
					<circle
						r="92"
						fill="none"
						stroke={NAVY}
						strokeWidth="1"
						opacity="0.5"
					/>
					<circle
						r="70"
						fill="none"
						stroke={NAVY}
						strokeWidth="0.6"
						opacity="0.3"
					/>
					{rays.map((a, i) => {
						const long = i % 4 === 0;
						const r1 = long ? 44 : 66;
						return (
							<line
								key={a}
								x1={Math.cos(a) * r1}
								y1={Math.sin(a) * r1}
								x2={Math.cos(a) * 92}
								y2={Math.sin(a) * 92}
								stroke={NAVY}
								strokeWidth={long ? 1 : 0.5}
								opacity={long ? 0.5 : 0.26}
							/>
						);
					})}
					<path d="M0 -88 L12 0 L0 20 L-12 0 Z" fill={SKY} />
					<path d="M0 88 L-12 0 L0 -20 L12 0 Z" fill={NAVY} opacity="0.55" />
				</motion.g>
				<text
					x="0"
					y="-70"
					textAnchor="middle"
					fontSize="13"
					fontFamily="var(--font-mono)"
					fill={OCEAN}
				>
					N
				</text>
			</g>
		</svg>
	);
}

function Buoy({ color }: { color: string }) {
	return (
		<svg width="26" height="34" viewBox="0 0 26 34" aria-hidden="true">
			<path d="M13 2 L20 16 L6 16 Z" fill={color} />
			<rect x="9" y="16" width="8" height="10" fill={color} opacity="0.85" />
			<line x1="13" y1="26" x2="13" y2="33" stroke={NAVY} strokeWidth="1.4" />
			<ellipse cx="13" cy="33" rx="7" ry="2" fill={NAVY} opacity="0.16" />
		</svg>
	);
}

function KartaHero({ reduce }: { reduce: boolean }) {
	const pathRef = useRef<SVGPathElement>(null);
	const progress = useMotionValue(reduce ? 1 : 0);
	const [len, setLen] = useState(0);
	const [waypoints, setWaypoints] = useState<Pt[]>([]);

	useEffect(() => {
		const p = pathRef.current;
		if (!p) return;
		const total = p.getTotalLength();
		setLen(total);
		setWaypoints(
			[0, 0.28, 0.56, 0.82, 1].map((t) => {
				const pt = p.getPointAtLength(t * total);
				return { x: pt.x, y: pt.y };
			}),
		);
		if (reduce) {
			progress.set(1);
			return;
		}
		const controls = animate(progress, 1, {
			duration: 6,
			ease: "easeInOut",
			repeat: Infinity,
			repeatDelay: 1.6,
		});
		return () => controls.stop();
	}, [reduce, progress]);

	const boatX = useTransform(
		progress,
		(v) => pathRef.current?.getPointAtLength(v * len).x ?? 60,
	);
	const boatY = useTransform(
		progress,
		(v) => pathRef.current?.getPointAtLength(v * len).y ?? 430,
	);
	const boatAngle = useTransform(progress, (v) => {
		const p = pathRef.current;
		if (!p) return 0;
		const a = p.getPointAtLength(Math.max(0, v * len - 1.5));
		const b = p.getPointAtLength(Math.min(len, v * len + 1.5));
		return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
	});

	const end = waypoints[waypoints.length - 1] ?? { x: 944, y: 150 };

	return (
		<section className="relative flex min-h-svh flex-col justify-center px-5 pt-24 pb-12 md:px-10">
			<div className="pointer-events-none absolute right-4 top-24 opacity-70 md:right-16">
				<CompassRose size={168} animated={!reduce} />
			</div>

			<div className="mx-auto w-full max-w-6xl">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
					<div className="max-w-xl">
						<p
							className="font-mono text-[0.74rem] tracking-[0.2em]"
							style={{ color: OCEAN }}
						>
							43&deg;30&prime;N &nbsp; 016&deg;26&prime;E &nbsp; / &nbsp;
							eInstruktor
						</p>
						<h1
							className="mt-4 font-serif text-4xl leading-[1.02] sm:text-5xl md:text-6xl"
							style={{ color: NAVY }}
						>
							Isplaniraj svoj <span style={{ color: SKY }}>kurs</span>
							<br /> do dozvole za brod.
						</h1>
						<p
							className="mt-5 max-w-md text-[1.05rem] leading-relaxed"
							style={{ color: MUTE }}
						>
							Voditelj brodice bez debele skripte. Učiš kao da čitaš kartu:
							kratke lekcije, vježba po područjima i pravi probni ispit. Uplovi
							spreman.
						</p>
						<div className="mt-8">
							<LandingCtas />
						</div>
						<div className="mt-5 flex items-center gap-3">
							<FreeChip />
							<span className="text-[0.82rem]" style={{ color: MUTE }}>
								{cta.freeNote}
							</span>
						</div>
					</div>

					<div className="relative">
						<svg
							viewBox="0 0 1000 560"
							className="w-full drop-shadow-sm"
							role="img"
							aria-label="Pomorska karta na kojoj brod sam plovi kurs do polozene dozvole"
						>
							<rect
								x="4"
								y="4"
								width="992"
								height="552"
								rx="18"
								fill={PAPER}
								stroke={NAVY}
								strokeOpacity="0.14"
							/>
							{Array.from({ length: 26 }, (_, i) => ({
								x: 70 + (i % 13) * 68,
								y: 90 + Math.floor(i / 13) * 380,
								v: 6 + ((i * 3) % 40),
							})).map((d) => (
								<text
									key={`${d.x}-${d.y}`}
									x={d.x}
									y={d.y}
									fontSize="12"
									fontFamily="var(--font-mono)"
									fill={OCEAN}
									opacity="0.3"
								>
									{d.v}
								</text>
							))}
							<path
								d="M 0 520 Q 240 470 460 512 T 1000 486 L 1000 560 L 0 560 Z"
								fill={SKY}
								opacity="0.1"
							/>

							{/* the full course, faint */}
							<path
								d={COURSE_D}
								fill="none"
								stroke={NAVY}
								strokeOpacity="0.22"
								strokeWidth="2.4"
								strokeDasharray="2 8"
								strokeLinecap="round"
							/>
							{/* the sailed trail, drawn as the boat advances */}
							<motion.path
								ref={pathRef}
								d={COURSE_D}
								fill="none"
								stroke={SKY}
								strokeWidth="3.4"
								strokeLinecap="round"
								style={{ pathLength: progress }}
							/>

							{waypoints.map((w, i) => (
								<g key={`${w.x}-${w.y}`}>
									<circle
										cx={w.x}
										cy={w.y}
										r="7"
										fill={PAPER}
										stroke={NAVY}
										strokeWidth="2"
									/>
									<circle cx={w.x} cy={w.y} r="2.6" fill={SKY} />
									<text
										x={w.x}
										y={w.y + 28}
										textAnchor="middle"
										fontSize="15"
										fontFamily="var(--font-mono)"
										fontWeight="700"
										fill={NAVY}
									>
										{WP_LABELS[i]}
									</text>
								</g>
							))}

							{reduce ? (
								<g transform={`translate(${end.x}, ${end.y})`}>
									<BoatGlyph />
								</g>
							) : (
								<motion.g style={{ x: boatX, y: boatY, rotate: boatAngle }}>
									<BoatGlyph />
								</motion.g>
							)}
						</svg>
						<p
							className="mt-3 text-center font-mono text-[0.72rem] tracking-wide"
							style={{ color: "rgba(0,44,120,0.55)" }}
						>
							Brod sam plovi kurs
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function BoatGlyph() {
	return (
		<g>
			<circle
				r="15"
				fill={PAPER}
				stroke={SKY}
				strokeWidth="1.5"
				opacity="0.6"
			/>
			<path d="M-11 4 L11 4 L6 11 L-6 11 Z" fill={NAVY} />
			<path d="M0 -13 L0 3 L9 3 Z" fill={SKY} />
			<line x1="0" y1="-13" x2="0" y2="4" stroke={NAVY} strokeWidth="1.6" />
		</g>
	);
}

function KartaCategories({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-10 md:py-16">
			<div className="mx-auto max-w-5xl">
				<div
					className="flex items-end justify-between gap-6 border-b pb-5"
					style={{ borderColor: "rgba(0,44,120,0.14)" }}
				>
					<h2 className="font-serif text-3xl md:text-4xl">
						Koju dozvolu trebaš?
					</h2>
					<span
						className="hidden font-mono text-[0.74rem] tracking-widest sm:block"
						style={{ color: OCEAN }}
					>
						IZBOR KURSA
					</span>
				</div>

				<div className="mt-8 grid gap-6 md:grid-cols-2">
					{categories.map((c) => (
						<motion.div key={c.code} {...reveal(reduce)}>
							<Card
								className="block h-full rounded-[var(--radius)] border p-7 shadow-none"
								style={{
									borderColor: c.recommended ? SKY : "rgba(0,44,120,0.16)",
									background: c.recommended
										? "rgba(0,174,243,0.06)"
										: "rgba(255,255,255,0.7)",
								}}
							>
								<div className="flex items-baseline justify-between">
									<span
										className="font-serif text-6xl"
										style={{ color: c.recommended ? OCEAN : NAVY }}
									>
										{c.code}
									</span>
									<span
										className="font-mono text-[0.74rem]"
										style={{ color: OCEAN }}
									>
										od {c.minAge} god.
									</span>
								</div>
								<h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
								<p
									className="mt-1 text-[0.95rem] font-medium"
									style={{ color: OCEAN }}
								>
									{c.summary}
								</p>
								<p
									className="mt-3 text-[0.95rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									{c.detail}
								</p>
								{c.recommended && (
									<span
										className="mt-5 inline-block rounded-full px-3 py-1 font-mono text-[0.68rem] tracking-wide text-white"
										style={{ background: NAVY }}
									>
										PREPORUKA
									</span>
								)}
							</Card>
						</motion.div>
					))}
				</div>
				<p className="mt-6 text-[0.92rem]" style={{ color: MUTE }}>
					Tečaj nije obavezan za A i B. Možeš učiti sam i prijaviti se izravno.
					Tečaj pomaže ako nemaš iskustva na moru.
				</p>
			</div>
		</section>
	);
}

function KartaHarbours({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-10">
			<div className="mx-auto max-w-5xl">
				<div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
					<div>
						<span
							className="font-mono text-[0.74rem] tracking-widest"
							style={{ color: OCEAN }}
						>
							LUKE ZA POLAGANJE
						</span>
						<h2 className="mt-2 font-serif text-3xl md:text-4xl">
							Gdje spuštaš sidro na ispit
						</h2>
						<p
							className="mt-4 text-[1rem] leading-relaxed"
							style={{ color: MUTE }}
						>
							Polažeš u Zagrebu na Ministarstvu ili u nekoj od lučke kapetanija
							uz obalu. Odaberi luku koja ti je najbliža i javi se za termin.
						</p>
						<ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-[0.86rem]">
							{harbours.map((h) => (
								<li
									key={h.name}
									className="flex items-center gap-2"
									style={{ color: NAVY }}
								>
									<span
										className="inline-block h-1.5 w-1.5 rounded-full"
										style={{
											background: h.kind === "ministarstvo" ? OCEAN : SKY,
										}}
									/>
									{h.name}
								</li>
							))}
						</ul>

						<div
							className="mt-6 border-t pt-4"
							style={{ borderColor: "rgba(0,44,120,0.16)" }}
						>
							<p
								className="font-mono text-[0.72rem] tracking-widest"
								style={{ color: OCEAN }}
							>
								PRISTOJBE (OKVIRNO)
							</p>
							<div
								className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.84rem]"
								style={{ color: NAVY }}
							>
								{costs.map((c) => (
									<span key={c.label}>
										{c.label}: <span style={{ color: OCEAN }}>{c.range}</span>
									</span>
								))}
							</div>
							<p
								className="mt-2 text-[0.8rem]"
								style={{ color: "rgba(0,44,120,0.55)" }}
							>
								Cijene se mijenjaju. Provjeri kod kapetanije ili Ministarstva.
							</p>
						</div>
					</div>

					<motion.svg
						{...reveal(reduce)}
						viewBox="0 0 520 320"
						className="w-full"
						role="img"
						aria-label="Obala s lukama za polaganje ispita"
					>
						<path
							d="M 0 60 Q 120 40 180 90 T 320 120 Q 420 140 520 110 L 520 320 L 0 320 Z"
							fill={SKY}
							opacity="0.16"
						/>
						<path
							d="M 0 60 Q 120 40 180 90 T 320 120 Q 420 140 520 110"
							fill="none"
							stroke={NAVY}
							strokeOpacity="0.4"
							strokeWidth="2"
						/>
						{[
							{ x: 60, y: 76, n: "Pula" },
							{ x: 150, y: 92, n: "Rijeka" },
							{ x: 250, y: 118, n: "Zadar" },
							{ x: 310, y: 122, n: "Sibenik" },
							{ x: 380, y: 132, n: "Split" },
							{ x: 450, y: 124, n: "Ploce" },
							{ x: 500, y: 112, n: "Dubrovnik" },
						].map((p) => (
							<g key={p.n}>
								<line
									x1={p.x}
									y1={p.y}
									x2={p.x}
									y2={p.y - 18}
									stroke={OCEAN}
									strokeWidth="1.5"
								/>
								<circle cx={p.x} cy={p.y - 20} r="3.2" fill={OCEAN} />
								<circle cx={p.x} cy={p.y} r="2.4" fill={NAVY} />
							</g>
						))}
						<g transform="translate(210, 210)">
							<circle
								r="26"
								fill="none"
								stroke={SKY}
								strokeWidth="1.5"
								opacity="0.8"
							/>
							<path d="M0 -18 L4 0 L0 18 L-4 0 Z" fill={SKY} />
							<text
								y="46"
								textAnchor="middle"
								fontSize="11"
								fontFamily="var(--font-mono)"
								fill={NAVY}
								opacity="0.6"
							>
								JADRAN
							</text>
						</g>
					</motion.svg>
				</div>
			</div>
		</section>
	);
}

function KartaAreas({ reduce }: { reduce: boolean }) {
	const marks = [SKY, OCEAN, NAVY];
	return (
		<section className="relative px-5 py-12 md:px-10 md:py-16">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex flex-wrap items-end gap-x-6 gap-y-2">
					<h2 className="font-serif text-3xl md:text-4xl">
						Osam područja ispita
					</h2>
					<span className="font-mono text-[0.8rem]" style={{ color: OCEAN }}>
						/ legenda karte
					</span>
				</div>
				<div
					className="grid gap-px overflow-hidden rounded-[var(--radius)] border sm:grid-cols-2 lg:grid-cols-4"
					style={{
						borderColor: "rgba(0,44,120,0.14)",
						background: "rgba(0,44,120,0.1)",
					}}
				>
					{examAreas.map((a, i) => (
						<motion.div
							key={a.id}
							{...reveal(reduce, 18)}
							transition={
								reduce
									? undefined
									: {
											duration: 0.5,
											delay: (i % 4) * 0.05,
											ease: [0.16, 1, 0.3, 1],
										}
							}
							className="flex min-h-44 flex-col justify-between p-5"
							style={{ background: PAPER }}
						>
							<div className="flex items-start justify-between">
								<Buoy color={marks[i % 3]} />
								<span
									className="font-mono text-[0.72rem]"
									style={{ color: "rgba(0,44,120,0.4)" }}
								>
									{String(i + 1).padStart(2, "0")}
								</span>
							</div>
							<div>
								<h3 className="text-[1.02rem] font-semibold leading-snug">
									{a.name}
								</h3>
								<p className="mt-1.5 text-[0.85rem]" style={{ color: MUTE }}>
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

/** The procedure as a contained navy chart card floating on the page. */
function KartaProcedure({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-12 md:px-10">
			<div
				className="mx-auto max-w-4xl rounded-[calc(var(--radius)+6px)] px-6 py-10 md:px-12"
				style={{
					background: NAVY,
					color: "#eaf3ff",
					boxShadow: "0 30px 60px rgba(0,44,120,0.22)",
				}}
			>
				<div
					className="flex items-end justify-between border-b pb-5"
					style={{ borderColor: "rgba(234,243,255,0.2)" }}
				>
					<h2 className="font-serif text-3xl md:text-4xl">
						Plan plovidbe do dozvole
					</h2>
					<span
						className="hidden font-mono text-[0.74rem] tracking-widest sm:block"
						style={{ color: "rgba(234,243,255,0.6)" }}
					>
						8 TOČAKA
					</span>
				</div>
				<ol className="relative mt-8 space-y-0">
					<span
						className="absolute bottom-4 left-[19px] top-4 w-px"
						style={{ background: "rgba(234,243,255,0.25)" }}
					/>
					{procedure.map((s) => (
						<motion.li
							key={s.n}
							{...reveal(reduce, 14)}
							className="relative flex gap-5 pb-6"
						>
							<span
								className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-[0.9rem] font-semibold"
								style={{ background: s.app ? SKY : "#eaf3ff", color: NAVY }}
							>
								{s.n}
							</span>
							<div className="pt-1.5">
								<h3 className="text-[1.05rem] font-semibold">
									{s.title}
									{s.app && (
										<span
											className="ml-2 rounded-full px-2 py-0.5 align-middle font-mono text-[0.62rem]"
											style={{ background: SKY, color: NAVY }}
										>
											TU SMO MI
										</span>
									)}
								</h3>
								<p
									className="mt-0.5 text-[0.92rem]"
									style={{ color: "rgba(234,243,255,0.72)" }}
								>
									{s.detail}
								</p>
							</div>
						</motion.li>
					))}
				</ol>
			</div>
		</section>
	);
}

function KartaPillars({ reduce }: { reduce: boolean }) {
	const glyphs: Record<string, React.ReactNode> = {
		ucenje: (
			<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
				<path
					d="M6 10 Q24 4 24 12 Q24 4 42 10 L42 40 Q24 34 24 42 Q24 34 6 40 Z"
					fill="none"
					stroke={SKY}
					strokeWidth="2"
				/>
				<line x1="24" y1="12" x2="24" y2="42" stroke={SKY} strokeWidth="1.4" />
			</svg>
		),
		vježbanje: (
			<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
				<circle
					cx="24"
					cy="24"
					r="18"
					fill="none"
					stroke={OCEAN}
					strokeWidth="2"
				/>
				<circle
					cx="24"
					cy="24"
					r="10"
					fill="none"
					stroke={OCEAN}
					strokeWidth="1.6"
				/>
				<circle cx="24" cy="24" r="3" fill={SKY} />
				<line x1="24" y1="2" x2="24" y2="10" stroke={OCEAN} strokeWidth="2" />
				<line x1="24" y1="38" x2="24" y2="46" stroke={OCEAN} strokeWidth="2" />
			</svg>
		),
		ispit: (
			<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
				<rect
					x="8"
					y="6"
					width="32"
					height="36"
					rx="3"
					fill="none"
					stroke={NAVY}
					strokeWidth="2"
				/>
				<path
					d="M15 24 l6 6 l12 -14"
					fill="none"
					stroke={SKY}
					strokeWidth="2.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	};
	return (
		<section className="relative px-5 py-12 md:px-10 md:py-16">
			<div className="mx-auto max-w-6xl">
				<h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
					Tri instrumenta koja te vode do prolaza
				</h2>
				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{pillars.map((p) => (
						<motion.div key={p.id} {...reveal(reduce)}>
							<Card
								className="block h-full rounded-[var(--radius)] border bg-white/70 p-7 shadow-none"
								style={{ borderColor: "rgba(0,44,120,0.14)" }}
							>
								{glyphs[p.id]}
								<h3 className="mt-5 text-xl font-semibold">{p.name}</h3>
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
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function KartaReadiness({ reduce }: { reduce: boolean }) {
	const value = readiness.sampleValue;
	return (
		<section className="relative px-5 py-12 md:px-10">
			<div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1fr] md:items-center">
				<div>
					<span
						className="font-mono text-[0.74rem] tracking-widest"
						style={{ color: OCEAN }}
					>
						BRZINOMJER SPREMNOSTI
					</span>
					<h2 className="mt-2 font-serif text-3xl md:text-4xl">
						{readiness.label}
					</h2>
					<p
						className="mt-4 text-[1rem] leading-relaxed"
						style={{ color: MUTE }}
					>
						Kao brzinomjer, pokazuje koliko si spreman. {readiness.sublabel}.
						Aplikacija prati tvoje greške i javlja kad si siguran za izlazak.
					</p>
					<ul className="mt-6 flex flex-wrap gap-2">
						{readiness.badges.map((b) => (
							<li
								key={b.name}
								className="rounded-full border px-3 py-1.5 font-mono text-[0.72rem]"
								style={{ borderColor: "rgba(0,44,120,0.2)", color: NAVY }}
							>
								{b.name}
							</li>
						))}
					</ul>
				</div>

				<Card
					className="mx-auto block w-full max-w-xs rounded-[var(--radius)] border bg-white/80 p-6 shadow-none"
					style={{ borderColor: "rgba(0,44,120,0.14)" }}
				>
					<Speedometer
						value={value}
						track="rgba(0,44,120,0.12)"
						fill={SKY}
						valueColor={NAVY}
						labelColor={OCEAN}
						animated={!reduce}
					/>
				</Card>
			</div>
		</section>
	);
}

function KartaQuote() {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto max-w-3xl text-center">
				<svg
					width="44"
					height="44"
					viewBox="0 0 46 46"
					aria-hidden="true"
					className="mx-auto"
				>
					<circle
						cx="23"
						cy="23"
						r="21"
						fill="none"
						stroke={OCEAN}
						strokeOpacity="0.4"
					/>
					<path d="M23 3 L27 23 L23 30 L19 23 Z" fill={SKY} />
					<path d="M23 43 L19 23 L23 16 L27 23 Z" fill={NAVY} opacity="0.55" />
				</svg>
				<blockquote
					className="mt-5 font-serif text-2xl leading-snug sm:text-3xl md:text-4xl"
					style={{ color: NAVY }}
				>
					&ldquo;{quotes.karta}&rdquo;
				</blockquote>
				<p
					className="mt-4 font-mono text-[0.76rem] tracking-widest"
					style={{ color: OCEAN }}
				>
					STARA POMORSKA
				</p>
			</div>
		</section>
	);
}

function KartaFaqSection() {
	return (
		<section className="relative px-5 py-12 md:px-10 md:py-16">
			<div className="mx-auto max-w-3xl">
				<h2 className="font-serif text-3xl md:text-4xl">Česta pitanja</h2>
				<LandingFaq />
			</div>
		</section>
	);
}

function KartaFinalCta() {
	return (
		<section id="pocni" className="relative px-5 py-16 md:px-10">
			<Card
				className="mx-auto block max-w-3xl rounded-[var(--radius)] border px-6 py-12 text-center shadow-none"
				style={{
					borderColor: "rgba(0,174,243,0.4)",
					background:
						"linear-gradient(180deg, rgba(0,174,243,0.08), rgba(255,255,255,0.7))",
				}}
			>
				<h2 className="font-serif text-4xl leading-tight md:text-5xl">
					Kurs je ucrtan.{" "}
					<span style={{ color: OCEAN }}>Vrijeme je za isplovljavanje.</span>
				</h2>
				<p
					className="mx-auto mt-4 max-w-lg text-[1.05rem]"
					style={{ color: MUTE }}
				>
					Počni odmah, bez registracije. Prijava Googleom čuva tvoj napredak i
					slabe teme na svim uređajima.
				</p>
				<div className="mt-8 flex justify-center">
					<LandingCtas />
				</div>
				<div className="mt-6 flex justify-center">
					<FreeChip />
				</div>
			</Card>
		</section>
	);
}

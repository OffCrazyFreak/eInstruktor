import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
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
	winds,
} from "@/features/landing/content";
import { Speedometer } from "@/features/landing/illustrations/Speedometer";
import { WindRose } from "@/features/landing/illustrations/WindRose";
import { cn } from "@/lib/utils";

/**
 * Concept 2 - Radarski most.
 * A light instruments page. Signature: a radar sweep (a rotating conic beam,
 * cleanly centered) that pings the 8 exam topics as contacts; hover a contact to
 * light it up in the legend. Readiness is a speedometer. Sections flow on one
 * continuous background.
 */

const NAVY = "#002c78";
const SKY = "#00aef3";
const OCEAN = "#0a63b0";
const MUTE = "rgba(0,44,120,0.66)";
const PANEL = "#ffffff";
const BORDER = "rgba(0,44,120,0.14)";

const CONTACTS = [
	{ id: "navigacija", deg: 18, r: 142 },
	{ id: "iala", deg: 64, r: 92 },
	{ id: "svjetla", deg: 108, r: 162 },
	{ id: "sudari", deg: 150, r: 112 },
	{ id: "meteorologija", deg: 202, r: 150 },
	{ id: "motoristika", deg: 242, r: 82 },
	{ id: "sigurnost", deg: 292, r: 132 },
	{ id: "vhf", deg: 332, r: 104 },
];

function polar(deg: number, r: number, cx = 200, cy = 200) {
	const a = (deg * Math.PI) / 180;
	return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
}

export function NocniMost() {
	const reduce = useReducedMotion();
	return (
		<div
			className="relative min-h-svh overflow-hidden font-sans"
			style={{ color: NAVY }}
		>
			<PageBackdrop />
			<NmHero reduce={!!reduce} />
			<NmCategories reduce={!!reduce} />
			<NmAreas reduce={!!reduce} />
			<NmWinds reduce={!!reduce} />
			<NmProcedure reduce={!!reduce} />
			<NmPillars reduce={!!reduce} />
			<NmReadiness reduce={!!reduce} />
			<NmHarboursFree reduce={!!reduce} />
			<NmQuote />
			<NmFaq />
			<NmFinalCta />
		</div>
	);
}

/** One continuous surface so sections flow rather than stack as color bands. */
function PageBackdrop() {
	return (
		<div
			aria-hidden="true"
			className="fixed inset-0 -z-10"
			style={{
				background:
					"radial-gradient(1100px 600px at 80% -5%, rgba(0,174,243,0.1), transparent 60%), radial-gradient(900px 500px at 0% 30%, rgba(0,44,120,0.06), transparent 55%), linear-gradient(180deg, #f7fbff 0%, #eaf3fd 45%, #f4f9fe 100%)",
			}}
		/>
	);
}

function reveal(reduce: boolean, y = 22) {
	if (reduce) return {};
	return {
		initial: { opacity: 0, y },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, margin: "-70px" },
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
	};
}

/** Instrument panel built on the shadcn Card. */
function NmPanel({
	children,
	className,
	style,
}: {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<Card
			className={cn(
				"block rounded-[var(--radius)] border p-6 shadow-none",
				className,
			)}
			style={{
				background: PANEL,
				borderColor: BORDER,
				boxShadow: "0 14px 34px rgba(0,44,120,0.07)",
				...style,
			}}
		>
			{children}
		</Card>
	);
}

function NmHero({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 pt-28 pb-12 md:px-10">
			<div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
				<div>
					<div
						className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.72rem]"
						style={{ borderColor: BORDER, color: OCEAN }}
					>
						<span
							className="inline-block h-1.5 w-1.5 rounded-full"
							style={{ background: SKY }}
						/>
						INSTRUMENTI / SUSTAV AKTIVAN
					</div>
					<h1 className="mt-5 font-serif text-4xl leading-[1.03] sm:text-5xl md:text-[3.6rem]">
						Cijeli ispit <span style={{ color: SKY }}>na radaru.</span>
						<br />
						Ništa te ne iznenadi.
					</h1>
					<p
						className="mt-5 max-w-md text-[1.05rem] leading-relaxed"
						style={{ color: MUTE }}
					>
						Svih osam područja ispita za voditelja brodice na jednom zaslonu.
						Kratke lekcije, ciljana vježba i probni ispit koji vjerno oponaša
						pravi.
					</p>
					<div className="mt-8">
						<LandingCtas />
					</div>
					<div className="mt-5 flex flex-wrap items-center gap-3">
						<FreeChip />
						<span className="text-[0.82rem]" style={{ color: MUTE }}>
							{cta.freeNote}
						</span>
					</div>

					<div
						className="mt-8 flex max-w-md items-center gap-4 rounded-2xl border px-4 py-3"
						style={{ borderColor: BORDER, background: "rgba(255,255,255,0.7)" }}
					>
						<span
							className="font-mono text-[0.78rem] font-bold"
							style={{ color: OCEAN }}
						>
							VHF 16
						</span>
						<VhfWave reduce={reduce} />
						<span className="font-mono text-[0.72rem]" style={{ color: MUTE }}>
							MAYDAY - kanal za pozive u nuždi
						</span>
					</div>
				</div>

				<Radar reduce={reduce} />
			</div>
		</section>
	);
}

function VhfWave({ reduce }: { reduce: boolean }) {
	return (
		<svg
			width="80"
			height="24"
			viewBox="0 0 80 24"
			aria-hidden="true"
			className="shrink-0"
		>
			<motion.path
				d="M0 12 Q6 2 12 12 T24 12 T36 12 T48 12 T60 12 T72 12 T80 12"
				fill="none"
				stroke={SKY}
				strokeWidth="1.6"
				animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
				transition={reduce ? undefined : { duration: 1.6, repeat: Infinity }}
			/>
		</svg>
	);
}

function Radar({ reduce }: { reduce: boolean }) {
	const rings = [60, 110, 160, 190];
	const [active, setActive] = useState<string | null>(null);
	const sweep =
		"conic-gradient(from 0deg, rgba(0,174,243,0.42) 0deg, rgba(0,174,243,0.06) 42deg, rgba(0,174,243,0) 70deg, rgba(0,174,243,0) 360deg)";

	return (
		<div className="relative mx-auto w-full max-w-md">
			<div className="relative aspect-square w-full">
				{/* base screen: rings + crosshairs */}
				<svg
					viewBox="0 0 400 400"
					className="absolute inset-0 h-full w-full"
					aria-hidden="true"
					style={{ pointerEvents: "none" }}
				>
					<defs>
						<radialGradient id="rm-screen" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#ffffff" />
							<stop offset="100%" stopColor="#e7f2fd" />
						</radialGradient>
					</defs>
					<circle
						cx="200"
						cy="200"
						r="192"
						fill="url(#rm-screen)"
						stroke={BORDER}
					/>
					{rings.map((r) => (
						<circle
							key={r}
							cx="200"
							cy="200"
							r={r}
							fill="none"
							stroke={OCEAN}
							strokeOpacity="0.16"
						/>
					))}
					{[0, 45, 90, 135].map((a) => {
						const p1 = polar(a, 190);
						const p2 = polar(a + 180, 190);
						return (
							<line
								key={a}
								x1={p1.x}
								y1={p1.y}
								x2={p2.x}
								y2={p2.y}
								stroke={OCEAN}
								strokeOpacity="0.12"
							/>
						);
					})}
				</svg>

				{/* rotating sweep - a conic beam; rotates around its own center (bulletproof) */}
				<motion.div
					aria-hidden="true"
					className="absolute inset-[2%] rounded-full"
					style={{ background: sweep, pointerEvents: "none" }}
					animate={reduce ? { rotate: 40 } : { rotate: 360 }}
					transition={
						reduce
							? undefined
							: { duration: 5, repeat: Infinity, ease: "linear" }
					}
				/>

				{/* contacts on top - hover to highlight the legend below */}
				<svg
					viewBox="0 0 400 400"
					className="absolute inset-0 h-full w-full"
					role="img"
					aria-label="Radarski prikaz osam područja ispita kao kontakti"
				>
					{CONTACTS.map((c) => {
						const p = polar(c.deg, c.r);
						const isActive = active === c.id;
						return (
							// biome-ignore lint/a11y/noStaticElementInteractions: decorative pointer affordance; the legend buttons below are the keyboard-accessible control
							<g
								key={c.id}
								style={{ cursor: "pointer" }}
								onMouseEnter={() => setActive(c.id)}
								onMouseLeave={() => setActive(null)}
							>
								<circle cx={p.x} cy={p.y} r="18" fill="transparent" />
								<circle
									cx={p.x}
									cy={p.y}
									r={isActive ? 7 : 5}
									fill={isActive ? OCEAN : SKY}
								/>
								<circle
									cx={p.x}
									cy={p.y}
									r={isActive ? 14 : 9}
									fill="none"
									stroke={SKY}
									strokeOpacity={isActive ? 0.9 : 0.5}
									strokeWidth={isActive ? 2 : 1}
								/>
							</g>
						);
					})}
					<circle cx="200" cy="200" r="3.5" fill={NAVY} />
				</svg>
			</div>

			{/* legend maps blips to topic names; also the keyboard-friendly control */}
			<div className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-2">
				{CONTACTS.map((c, i) => {
					const area = examAreas.find((a) => a.id === c.id);
					const isActive = active === c.id;
					return (
						<button
							key={c.id}
							type="button"
							onMouseEnter={() => setActive(c.id)}
							onMouseLeave={() => setActive(null)}
							onFocus={() => setActive(c.id)}
							onBlur={() => setActive(null)}
							className="flex items-center gap-2 rounded-md px-2 py-1 text-left font-mono text-[0.74rem] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#00aef3]"
							style={{
								color: isActive ? NAVY : MUTE,
								background: isActive ? "rgba(0,174,243,0.12)" : "transparent",
							}}
						>
							<span
								className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
								style={{ background: isActive ? OCEAN : SKY }}
							/>
							{String(i + 1).padStart(2, "0")} {area?.name}
						</button>
					);
				})}
			</div>
		</div>
	);
}

function NmCategories({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto max-w-5xl">
				<h2
					className="font-mono text-[0.8rem] tracking-[0.2em]"
					style={{ color: OCEAN }}
				>
					{"// ODABIR REŽIMA"}
				</h2>
				<p className="mt-2 max-w-2xl font-serif text-3xl md:text-4xl">
					Koja kategorija dozvole
				</p>
				<div className="mt-8 grid gap-5 md:grid-cols-2">
					{categories.map((c) => (
						<motion.div key={c.code} {...reveal(reduce)}>
							<NmPanel
								style={
									c.recommended
										? {
												borderColor: "rgba(0,174,243,0.55)",
												boxShadow: "0 14px 34px rgba(0,174,243,0.12)",
											}
										: undefined
								}
							>
								<div
									className="flex items-center justify-between font-mono text-[0.76rem]"
									style={{ color: MUTE }}
								>
									<span>KAT. {c.code}</span>
									<span>od {c.minAge} god.</span>
								</div>
								<div className="mt-3 flex items-baseline gap-3">
									<span
										className="font-serif text-5xl"
										style={{ color: c.recommended ? OCEAN : NAVY }}
									>
										{c.code}
									</span>
									<h3 className="text-lg font-semibold">{c.title}</h3>
								</div>
								<p
									className="mt-3 text-[0.94rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									{c.detail}
								</p>
								{c.recommended && (
									<span
										className="mt-4 inline-block rounded-full px-3 py-1 font-mono text-[0.66rem] text-white"
										style={{ background: NAVY }}
									>
										PREPORUKA
									</span>
								)}
							</NmPanel>
						</motion.div>
					))}
				</div>
				<p className="mt-5 font-mono text-[0.8rem]" style={{ color: MUTE }}>
					Tečaj nije obavezan. Za A i B možeš učiti sam i prijaviti se izravno.
				</p>
			</div>
		</section>
	);
}

function NmAreas({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto max-w-6xl">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<h2 className="font-serif text-3xl md:text-4xl">
						Osam kontakata na zaslonu
					</h2>
					<span className="font-mono text-[0.78rem]" style={{ color: OCEAN }}>
						8 / 8 DETEKTIRANO
					</span>
				</div>
				<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{examAreas.map((a, i) => (
						<motion.div
							key={a.id}
							{...reveal(reduce, 16)}
							transition={
								reduce
									? undefined
									: {
											duration: 0.5,
											delay: (i % 4) * 0.06,
											ease: [0.16, 1, 0.3, 1],
										}
							}
						>
							<NmPanel className="h-full p-5">
								<div className="flex items-center justify-between">
									<span
										className="inline-block h-2.5 w-2.5 rounded-full"
										style={{ background: SKY }}
									/>
									<span
										className="font-mono text-[0.72rem]"
										style={{ color: MUTE }}
									>
										C-{String(i + 1).padStart(2, "0")}
									</span>
								</div>
								<h3 className="mt-4 text-[1rem] font-semibold leading-snug">
									{a.name}
								</h3>
								<p className="mt-1.5 text-[0.84rem]" style={{ color: MUTE }}>
									{a.blurb}
								</p>
							</NmPanel>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function NmWinds({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
				<div>
					<span
						className="font-mono text-[0.78rem] tracking-widest"
						style={{ color: OCEAN }}
					>
						METEOROLOGIJA
					</span>
					<h2 className="mt-2 font-serif text-3xl md:text-4xl">
						Jadranski vjetrovi
					</h2>
					<p
						className="mt-4 text-[1rem] leading-relaxed"
						style={{ color: MUTE }}
					>
						Bura, jugo, maestral i nevera. Prepoznaj ih po smjeru i ćudi, jer o
						njima ovisi svaki izlazak i pitanje na ispitu.
					</p>
					<ul className="mt-6 space-y-3">
						{winds.map((w) => (
							<li key={w.name} className="flex items-start gap-3">
								<span
									className="mt-1 font-mono text-[0.72rem]"
									style={{ color: OCEAN }}
								>
									{String(w.deg).padStart(3, "0")}&deg;
								</span>
								<span>
									<span className="font-semibold">{w.name}</span>
									<span className="text-[0.88rem]" style={{ color: MUTE }}>
										{" "}
										- {w.note}
									</span>
								</span>
							</li>
						))}
					</ul>
				</div>

				<motion.div {...reveal(reduce)} className="mx-auto w-full max-w-sm">
					<WindRose
						animated={!reduce}
						navy={NAVY}
						sky={SKY}
						line="rgba(0,44,120,0.16)"
						label={NAVY}
					/>
				</motion.div>
			</div>
		</section>
	);
}

function NmProcedure({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto max-w-4xl">
				<h2 className="font-serif text-3xl md:text-4xl">
					Redoslijed do dozvole
				</h2>
				<p className="mt-2 font-mono text-[0.8rem]" style={{ color: MUTE }}>
					osam koraka od odluke do ispita
				</p>
				<div className="mt-8 grid gap-3">
					{procedure.map((s) => (
						<motion.div
							key={s.n}
							{...reveal(reduce, 12)}
							className="flex items-center gap-4 rounded-2xl border px-4 py-3.5"
							style={{
								borderColor: s.app ? "rgba(0,174,243,0.5)" : BORDER,
								background: s.app ? "rgba(0,174,243,0.08)" : PANEL,
							}}
						>
							<span
								className="font-mono text-[0.82rem] font-bold"
								style={{ color: s.app ? OCEAN : MUTE }}
							>
								{String(s.n).padStart(2, "0")}
							</span>
							<span className="h-4 w-px" style={{ background: BORDER }} />
							<span className="font-semibold">{s.title}</span>
							{s.app && (
								<span
									className="rounded-full px-2 py-0.5 font-mono text-[0.62rem]"
									style={{ background: SKY, color: NAVY }}
								>
									TU SMO MI
								</span>
							)}
							<span
								className="ml-auto hidden text-right text-[0.85rem] sm:block"
								style={{ color: MUTE }}
							>
								{s.detail}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function NmPillars({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto max-w-6xl">
				<h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
					Tri sustava na mostu
				</h2>
				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{pillars.map((p) => (
						<motion.div key={p.id} {...reveal(reduce)}>
							<NmPanel className="h-full">
								<span
									className="font-mono text-[0.78rem]"
									style={{ color: OCEAN }}
								>
									SYS {p.step}
								</span>
								<h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
								<p className="mt-1 text-[0.9rem]" style={{ color: OCEAN }}>
									{p.tagline}
								</p>
								<p
									className="mt-3 text-[0.92rem] leading-relaxed"
									style={{ color: MUTE }}
								>
									{p.detail}
								</p>
							</NmPanel>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function NmReadiness({ reduce }: { reduce: boolean }) {
	const value = readiness.sampleValue;
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1fr] md:items-center">
				<div className="mx-auto w-full max-w-xs">
					<Speedometer
						value={value}
						track="rgba(0,44,120,0.12)"
						fill={SKY}
						valueColor={NAVY}
						labelColor={OCEAN}
						animated={!reduce}
					/>
				</div>
				<div>
					<h2 className="font-serif text-3xl md:text-4xl">{readiness.label}</h2>
					<p
						className="mt-4 text-[1rem] leading-relaxed"
						style={{ color: MUTE }}
					>
						Jedan pogled i znaš jesi li spreman. Brzinomjer raste kako svladavaš
						područja, a aplikacija te vraća na teme na kojima griješiš.
					</p>
					<ul className="mt-6 flex flex-wrap gap-2">
						{readiness.badges.map((b) => (
							<li
								key={b.name}
								className="rounded-full border px-3 py-1.5 font-mono text-[0.72rem]"
								style={{ borderColor: BORDER, color: OCEAN }}
							>
								{b.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

function NmHarboursFree({ reduce }: { reduce: boolean }) {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
				<motion.div {...reveal(reduce)}>
					<NmPanel className="h-full">
						<h3 className="font-serif text-2xl">Luke za polaganje</h3>
						<p className="mt-2 text-[0.92rem]" style={{ color: MUTE }}>
							Zagreb ili lučka kapetanija uz obalu. Cijene su okvirne i
							mijenjaju se, pa provjeri službeni izvor.
						</p>
						<ul className="mt-4 grid grid-cols-2 gap-y-1.5 font-mono text-[0.8rem]">
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
						<div className="mt-4 flex flex-wrap gap-2 font-mono text-[0.74rem]">
							{costs.map((c) => (
								<span
									key={c.label}
									className="rounded-lg border px-2.5 py-1"
									style={{ borderColor: BORDER, color: MUTE }}
								>
									{c.label}: {c.range}
								</span>
							))}
						</div>
					</NmPanel>
				</motion.div>

				<motion.div {...reveal(reduce)}>
					<NmPanel
						className="h-full"
						style={{
							borderColor: "rgba(0,174,243,0.5)",
							background:
								"linear-gradient(180deg, rgba(0,174,243,0.06), #ffffff)",
						}}
					>
						<div
							className="flex items-center gap-2 font-mono text-[0.78rem]"
							style={{ color: OCEAN }}
						>
							<span
								className="inline-block h-2 w-2 rounded-full"
								style={{ background: SKY }}
							/>
							SUSTAV ONLINE - 100% BESPLATNO
						</div>
						<h3 className="mt-3 font-serif text-2xl">Radi odmah, bez računa</h3>
						<p
							className="mt-2 text-[0.94rem] leading-relaxed"
							style={{ color: MUTE }}
						>
							Cijela aplikacija radi bez registracije. Prijavom Googleom čuvaš
							napredak i slabe teme na svim uređajima, a mi ne tražimo ništa
							više.
						</p>
						<ul className="mt-4 space-y-2 text-[0.9rem]">
							{[
								"Napredak sinkroniziran",
								"Slabe teme zapamćene",
								"Bez lozinke, jedan klik",
							].map((t) => (
								<li
									key={t}
									className="flex items-center gap-2"
									style={{ color: NAVY }}
								>
									<span style={{ color: SKY }}>+</span>
									{t}
								</li>
							))}
						</ul>
						<div className="mt-5">
							<FreeChip />
						</div>
					</NmPanel>
				</motion.div>
			</div>
		</section>
	);
}

function NmQuote() {
	return (
		<section className="relative px-5 py-16 md:px-10">
			<div className="mx-auto max-w-3xl text-center">
				<span
					className="font-mono text-[0.74rem] tracking-widest"
					style={{ color: OCEAN }}
				>
					LOG BROD
				</span>
				<blockquote className="mt-4 font-serif text-2xl leading-snug sm:text-3xl md:text-4xl">
					&ldquo;{quotes.most}&rdquo;
				</blockquote>
			</div>
		</section>
	);
}

function NmFaq() {
	return (
		<section className="relative px-5 py-14 md:px-10">
			<div className="mx-auto max-w-3xl">
				<h2 className="font-serif text-3xl md:text-4xl">Česta pitanja</h2>
				<LandingFaq />
			</div>
		</section>
	);
}

function NmFinalCta() {
	return (
		<section id="pocni" className="relative px-5 py-16 md:px-10">
			<div
				className="mx-auto max-w-3xl rounded-[var(--radius)] border p-10 text-center"
				style={{
					borderColor: "rgba(0,174,243,0.4)",
					background: "linear-gradient(180deg, rgba(0,174,243,0.08), #ffffff)",
				}}
			>
				<h2 className="font-serif text-4xl leading-tight md:text-5xl">
					Zaslon je spreman.{" "}
					<span style={{ color: OCEAN }}>Preuzmi kormilo.</span>
				</h2>
				<p
					className="mx-auto mt-4 max-w-lg text-[1.05rem]"
					style={{ color: MUTE }}
				>
					Počni sada i gledaj kako se spremnost puni. Sve besplatno, bez
					skrivenih troškova.
				</p>
				<div className="mt-8 flex justify-center">
					<LandingCtas />
				</div>
			</div>
		</section>
	);
}

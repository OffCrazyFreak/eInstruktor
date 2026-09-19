import { useState } from "react";
import { cn } from "@/lib/utils";
import { NocniMost } from "./concepts/NocniMost";
import { PomorskaKarta } from "./concepts/PomorskaKarta";
import { ZlatniSat } from "./concepts/ZlatniSat";

/**
 * Compares the remaining landing concepts behind one control. Pick a winner,
 * then delete the other concept files and this switcher.
 */

type Concept = {
	id: string;
	name: string;
	theme: "light" | "dark";
	Component: () => React.ReactNode;
};

const CONCEPTS: Concept[] = [
	{
		id: "karta",
		name: "Pomorska karta",
		theme: "light",
		Component: PomorskaKarta,
	},
	{ id: "most", name: "Radarski most", theme: "light", Component: NocniMost },
	{ id: "sat", name: "Zlatni sat", theme: "light", Component: ZlatniSat },
];

export function ConceptSwitcher() {
	const [active, setActive] = useState(0);
	const current = CONCEPTS[active];
	const Current = current.Component;

	function select(index: number) {
		setActive(index);
		if (typeof window !== "undefined") {
			window.scrollTo({ top: 0, behavior: "auto" });
		}
	}

	return (
		<main className={current.theme === "dark" ? "dark" : undefined}>
			<Current key={current.id} />

			<nav
				aria-label="Odabir koncepta odredišne stranice"
				className="pointer-events-none fixed inset-x-0 bottom-4 z-[120] flex justify-center px-4"
			>
				<div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/15 bg-[#04122a]/90 px-2 py-2 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
					<span className="hidden pl-2 pr-1 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-white/55 sm:inline">
						Koncept
					</span>
					{CONCEPTS.map((c, i) => (
						<button
							key={c.id}
							type="button"
							onClick={() => select(i)}
							aria-current={i === active ? "true" : undefined}
							aria-label={`${i + 1}. ${c.name}`}
							className={cn(
								"flex h-8 w-8 items-center justify-center rounded-full font-mono text-[0.85rem] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/70",
								i === active
									? "bg-white text-[#04122a]"
									: "text-white/70 hover:bg-white/10",
							)}
						>
							{i + 1}
						</button>
					))}
					<span
						className="ml-1 hidden min-w-[132px] px-2 text-sm font-medium sm:inline"
						aria-live="polite"
					>
						{current.name}
					</span>
				</div>
			</nav>
		</main>
	);
}

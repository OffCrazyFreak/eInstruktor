import { useId, useState } from "react";
import { spell } from "@/components/custom/visuals/phonetic-alphabet/phonetic-data";

/** Type any word and see it spelled with code words. */
export default function SpellInput() {
	const id = useId();
	const [text, setText] = useState("Galeb");
	const spelled = spell(text);

	return (
		<div className="space-y-2 rounded-2xl bg-tint p-3">
			<label htmlFor={id} className="text-[0.85rem] font-semibold">
				Upiši ime brodice, otoka ili svoje ime
			</label>
			<input
				id={id}
				value={text}
				maxLength={24}
				onChange={(event) => setText(event.target.value)}
				className="min-h-11 w-full rounded-xl border border-ink/20 bg-paper px-3 text-[0.95rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
			/>
			<ol
				className="m-0 flex list-none flex-wrap gap-1.5 p-0"
				aria-live="polite"
			>
				{spelled
					.map((item, position) => ({
						...item,
						id: `${position}:${item.symbol}`,
					}))
					.map((item) => (
						<li
							key={item.id}
							className="rounded-xl bg-paper px-2.5 py-1 text-[0.88rem]"
						>
							<span className="font-mono font-bold">{item.symbol}</span>{" "}
							{item.word ? item.word.spoken : "?"}
							{item.hasMark && (
								<span className="text-ink/60"> (s kvačicom)</span>
							)}
						</li>
					))}
			</ol>
		</div>
	);
}

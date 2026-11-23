import { useState } from "react";
import {
	WINDS,
	type WindId,
} from "@/components/custom/visuals/adriatic-winds/winds";

interface IWindCardProps {
	wind: WindId;
	showSigns: boolean;
}

export default function WindCard({ wind: id, showSigns }: IWindCardProps) {
	const wind = WINDS[id];
	const [signsOpen, setSignsOpen] = useState(showSigns);

	return (
		<div className="space-y-2 rounded-2xl bg-[#eaf3ff] p-3 text-[0.9rem] leading-relaxed">
			<div>
				<p className="font-serif text-xl">
					{wind.name}{" "}
					<span className="font-mono text-[0.85rem] text-[#0a63b0]">
						{wind.direction}
					</span>
				</p>
				<p className="text-[#002c78]/70">
					Puše {wind.directionName}
					{wind.alsoCalled ? `; zovu ga i ${wind.alsoCalled}` : ""}.
				</p>
			</div>
			<p>{wind.character}</p>
			{wind.signs && !signsOpen && (
				<button
					type="button"
					onClick={() => setSignsOpen(true)}
					className="text-[0.85rem] font-semibold text-[#0a63b0] underline underline-offset-2 outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
				>
					Pokaži znakove da dolazi
				</button>
			)}
			{signsOpen && wind.signs && (
				<div>
					<p className="font-semibold">Znakovi da dolazi</p>
					<ul className="m-0 list-disc space-y-0.5 pl-5">
						{wind.signs.map((sign) => (
							<li key={sign}>{sign}</li>
						))}
					</ul>
				</div>
			)}
			{wind.advice && (
				<p className="rounded-xl bg-[#ffe89a]/60 p-2 font-medium">
					{wind.advice}
				</p>
			)}
		</div>
	);
}

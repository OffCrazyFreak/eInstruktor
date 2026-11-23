import { useState } from "react";
import {
	CALL_SCRIPTS,
	type CallId,
	DEFAULT_FIELDS,
} from "@/components/custom/visuals/vhf-radio-call/call-scripts";
import { cn } from "@/lib/utils";

interface ICallOrderProps {
	call: CallId;
}

/** Fixed shuffle so the server and the browser render the same order. */
const SHUFFLE = [3, 0, 6, 2, 7, 1, 5, 4];

/** Tap the parts of the call in the order you would say them. */
export default function CallOrder({ call }: ICallOrderProps) {
	const steps = CALL_SCRIPTS[call].steps(DEFAULT_FIELDS[call]);
	const shuffled = SHUFFLE.filter((index) => index < steps.length)
		.map((index) => steps[index])
		.filter((step) => step !== undefined);
	const [picked, setPicked] = useState<string[]>([]);
	const [wrong, setWrong] = useState<string | null>(null);
	const done = picked.length === steps.length;

	function pick(title: string) {
		if (steps[picked.length]?.title === title) {
			setPicked([...picked, title]);
			setWrong(null);
		} else {
			setWrong(title);
		}
	}

	return (
		<div className="space-y-4">
			<p className="font-serif text-[1.02rem]">
				Složi {CALL_SCRIPTS[call].name} poziv pravim redom.
			</p>

			<ol className="m-0 list-none space-y-1.5 p-0">
				{picked.map((title, position) => (
					<li
						key={title}
						className="rounded-xl bg-[#14a05a]/10 px-3 py-2 text-[0.9rem]"
					>
						{position + 1}. {title}
					</li>
				))}
			</ol>

			{!done && (
				<div className="flex flex-wrap gap-2">
					{shuffled
						.filter((step) => !picked.includes(step.title))
						.map((step) => (
							<button
								key={step.title}
								type="button"
								onClick={() => pick(step.title)}
								className={cn(
									"min-h-11 rounded-2xl border px-3 text-[0.88rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
									wrong === step.title
										? "border-[#e0322b] bg-[#e0322b]/10"
										: "border-[#002c78]/15 bg-white hover:border-[#00aef3]",
								)}
							>
								{step.title}
							</button>
						))}
				</div>
			)}

			<div aria-live="polite" className="text-[0.9rem]">
				{wrong && !done && (
					<p>
						To ide kasnije. Što se kaže odmah nakon koraka{" "}
						{picked.length || "početka"}?
					</p>
				)}
				{done && (
					<div className="space-y-2">
						<p className="font-semibold">Točno. Ovako zvuči cijeli poziv:</p>
						<p className="leading-relaxed">
							{steps.map((step) => step.line).join(" ")}
						</p>
						<button
							type="button"
							onClick={() => setPicked([])}
							className="min-h-10 rounded-full border border-[#002c78]/20 px-4 text-[0.85rem] outline-none focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60"
						>
							Ponovi
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

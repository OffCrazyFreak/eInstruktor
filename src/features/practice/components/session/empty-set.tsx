import { Link } from "@tanstack/react-router";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import SessionTopBar from "@/features/practice/components/session/session-top-bar";

interface IEmptySetProps {
	title: string;
	message: string;
}

export default function EmptySet({ title, message }: IEmptySetProps) {
	return (
		<>
			<SessionTopBar
				title={title}
				closeTo="/vjezba"
				closeLabel="Natrag na vježbu"
				position={null}
			/>

			<main className="mx-auto flex max-w-xl flex-col items-start px-4 pt-10 pb-8 sm:px-6">
				<span className="grid size-14 place-items-center rounded-2xl bg-[#eaf3ff] text-[#0a63b0] dark:bg-accent dark:text-[#4cc2ff]">
					<Inbox className="size-7" aria-hidden="true" />
				</span>

				<h1 className="mt-6 font-serif text-2xl leading-tight">
					Ovdje sad nema pitanja
				</h1>
				<p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
					{message}
				</p>

				<div className="mt-8 flex flex-col gap-2 self-stretch sm:flex-row sm:self-auto">
					<Button asChild className="h-12 rounded-full px-6 font-semibold">
						<Link
							to="/vjezba/serija"
							search={{ mode: "mjesovito", length: 10 }}
						>
							Brza serija, 10 pitanja
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						className="h-12 rounded-full px-6 font-semibold"
					>
						<Link to="/vjezba">Natrag na vježbu</Link>
					</Button>
				</div>
			</main>
		</>
	);
}

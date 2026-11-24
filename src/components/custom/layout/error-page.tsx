import { Link } from "@tanstack/react-router";

interface IErrorPageProps {
	reset: () => void;
}

// The message stays generic on purpose: a raw error can carry paths or values that are not for visitors.
export default function ErrorPage({ reset }: IErrorPageProps) {
	return (
		<main className="grid min-h-svh place-items-center p-6 text-center">
			<div>
				<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
					Greška
				</p>
				<h1 className="mt-2 text-2xl font-semibold">Nešto je pošlo po krivu</h1>
				<p className="mx-auto mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
					Pokušaj ponovno, a ako se ponovi, vrati se na početnu.
				</p>
				<div className="mt-4 flex items-center justify-center gap-4 text-sm">
					<button type="button" onClick={reset} className="underline">
						Pokušaj ponovno
					</button>
					<Link to="/" className="underline">
						Natrag na početnu
					</Link>
				</div>
			</div>
		</main>
	);
}

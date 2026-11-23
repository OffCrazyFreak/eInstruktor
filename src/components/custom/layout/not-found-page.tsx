import { Link } from "@tanstack/react-router";

export default function NotFoundPage() {
	return (
		<main className="grid min-h-svh place-items-center p-6 text-center">
			<div>
				<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
					404
				</p>
				<h1 className="mt-2 text-2xl font-semibold">Stranica nije pronađena</h1>
				<Link to="/" className="mt-4 inline-block text-sm underline">
					Natrag na početnu
				</Link>
			</div>
		</main>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { ZlatniSat } from "@/features/landing/components/landing-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main>
			<ZlatniSat />
		</main>
	);
}

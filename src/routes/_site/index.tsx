import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/features/landing/components/landing-page";
import pageHead from "@/lib/seo/page-head";

export const Route = createFileRoute("/_site/")({
	head: () =>
		pageHead({
			path: "/",
			title: "Besplatna priprema za ispit za voditelja brodice",
			description:
				"Kratke vizualne lekcije, pitanja po područjima i probni ispit za voditelja brodice kategorije A i B. Besplatno i bez registracije.",
		}),
	component: Home,
});

function Home() {
	return (
		<main>
			<LandingPage />
		</main>
	);
}

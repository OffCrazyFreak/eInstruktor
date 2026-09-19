import { createFileRoute } from "@tanstack/react-router";
import { ConceptSwitcher } from "@/features/landing/ConceptSwitcher";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return <ConceptSwitcher />;
}

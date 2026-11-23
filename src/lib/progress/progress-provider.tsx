import type { ReactNode } from "react";
import { ProgressContext } from "@/lib/progress/progress-context";
import {
	browserProgressStore,
	type IProgressStore,
} from "@/lib/progress/progress-store";

interface IProgressProviderProps {
	children: ReactNode;
	/** Tests pass a store over in-memory storage. */
	store?: IProgressStore;
}

export default function ProgressProvider({
	children,
	store = browserProgressStore,
}: IProgressProviderProps) {
	return <ProgressContext value={store}>{children}</ProgressContext>;
}

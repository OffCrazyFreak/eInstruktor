import { createContext } from "react";
import {
	browserProgressStore,
	type IProgressStore,
} from "@/lib/progress/progress-store";

export const ProgressContext =
	createContext<IProgressStore>(browserProgressStore);

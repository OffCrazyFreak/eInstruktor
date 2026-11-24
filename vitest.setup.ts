import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only registers its own cleanup when Vitest globals are on, and they are off here.
afterEach(cleanup);

// jsdom has no layout, so it logs "not implemented" for every scroll the app asks for.
if (typeof window !== "undefined") {
	window.scrollTo = () => {};
}

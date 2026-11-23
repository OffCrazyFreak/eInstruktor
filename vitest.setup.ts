import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only registers its own cleanup when Vitest globals are on, and they are off here.
afterEach(cleanup);

import type { Direction } from "@/components/custom/visuals/iala-buoy-explorer/pass-diagram";
import type { IMark } from "@/components/custom/visuals/shared/buoy/buoy-marks";

const LEAVE_ON_PORT_ENTERING = new Set(["port", "preferred-channel-starboard"]);

/** Lateral marks flip sides when you leave harbour; every other mark is passed the same way both ways. */
export function describePass(mark: IMark, direction: Direction): string {
	if (mark.group !== "lateral") {
		return mark.pass;
	}

	const portWhenEntering = LEAVE_ON_PORT_ENTERING.has(mark.id);
	const onPort = direction === "inbound" ? portWhenEntering : !portWhenEntering;
	const verb = direction === "inbound" ? "Uplovljavaš" : "Isplovljavaš";

	return `${verb}: ostavi je sebi s ${onPort ? "lijeve" : "desne"} strane.`;
}

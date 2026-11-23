/** The demo lighthouse: white over the safe channel, red over the shoals on either side, bearings from the lighthouse. */
export const SECTORS = [
	{ from: 95, to: 135, color: "red" as const },
	{ from: 135, to: 205, color: "white" as const },
	{ from: 205, to: 245, color: "red" as const },
];

export interface ISessionUser {
	id: string;
	name: string;
	email: string;
	image?: string | null;
}

/** Reads the signed-in user for the current request; the real one asks better-auth, tests pass their own. */
export type SessionLookup = () => Promise<{ user: ISessionUser } | null>;

export class UnauthorizedError extends Error {
	constructor() {
		super("Prijava je potrebna");
		this.name = "UnauthorizedError";
	}
}

// Route guards are only UX; every server function that touches account data calls this itself.
export async function requireUser(
	lookup: SessionLookup,
): Promise<ISessionUser> {
	const session = await lookup();

	if (!session) {
		throw new UnauthorizedError();
	}

	return session.user;
}

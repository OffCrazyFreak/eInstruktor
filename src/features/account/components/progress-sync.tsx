import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useRef } from "react";
import { toast } from "sonner";
import { syncProgress } from "@/features/account/server/sync.functions";
import { createProgressSync } from "@/features/account/utils/progress-sync";
import { browserBaselineStorage } from "@/features/account/utils/sync-baseline";
import type { ISyncRequest } from "@/features/account/utils/sync-schema";
import useAuthStatus from "@/lib/auth/use-auth-status";
import { pluralHr } from "@/lib/plural";
import { ProgressContext } from "@/lib/progress/progress-context";

function announceFirstMerge(inserted: number) {
	if (inserted > 0) {
		toast.success(
			`Prenijeli smo ${inserted} ${pluralHr(inserted, "odgovor", "odgovora", "odgovora")} na tvoj račun.`,
		);
	}
}

function warnSyncFailing() {
	toast("Napredak trenutačno ne stiže na račun", {
		description: "Čuva se u ovom pregledniku i šaljemo ga čim veza proradi.",
	});
}

/** Keeps the signed-in learner's browser progress and account in step; renders nothing and never blocks the page. */
export default function ProgressSync() {
	const { viewer } = useAuthStatus();
	const store = useContext(ProgressContext);
	const userId = viewer.status === "signed-in" ? viewer.user.id : null;

	// The engine retries on its own schedule, so the mutation itself never retries.
	const { mutateAsync } = useMutation({
		mutationFn: (request: ISyncRequest) => syncProgress({ data: request }),
		retry: false,
	});
	const send = useRef(mutateAsync);
	send.current = mutateAsync;

	useEffect(() => {
		if (!userId) {
			return;
		}

		const sync = createProgressSync({
			store,
			userId,
			send: (request) => send.current(request),
			baseline: browserBaselineStorage,
			onFirstMerge: announceFirstMerge,
			onPersistentFailure: warnSyncFailing,
		});

		sync.start();

		return () => sync.stop();
	}, [store, userId]);

	return null;
}

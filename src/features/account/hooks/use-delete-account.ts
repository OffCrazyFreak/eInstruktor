import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { deleteAccount } from "@/features/account/server/account.functions";
import { browserBaselineStorage } from "@/features/account/utils/sync-baseline";
import { authClient } from "@/lib/auth/auth-client";
import { EMPTY_PROGRESS } from "@/lib/progress/progress-schema";
import useProgress from "@/lib/progress/use-progress";

export default function useDeleteAccount() {
	const navigate = useNavigate();
	const { update } = useProgress();

	const mutation = useMutation({
		mutationFn: () => deleteAccount({ data: { confirm: true } }),
		retry: false,
	});

	async function confirm(clearBrowser: boolean) {
		try {
			await mutation.mutateAsync();
		} catch {
			return;
		}

		browserBaselineStorage.clear();

		if (clearBrowser) {
			update(() => EMPTY_PROGRESS);
		}

		// The server already ended every session; this only tells the client, so it may fail without harm.
		await authClient.signOut().catch(() => undefined);

		toast.success("Račun je obrisan.");
		await navigate({ to: "/napredak" });
	}

	return { confirm, pending: mutation.isPending, failed: mutation.isError };
}

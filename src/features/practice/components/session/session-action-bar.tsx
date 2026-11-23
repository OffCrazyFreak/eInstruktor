import type { ReactNode } from "react";

interface ISessionActionBarProps {
	children: ReactNode;
}

/** The one spot for the main action, in thumb reach above the phone's home bar. */
export default function SessionActionBar({ children }: ISessionActionBarProps) {
	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:left-24">
			<div className="mx-auto flex max-w-2xl flex-col gap-2 px-4 py-3 sm:flex-row">
				{children}
			</div>
		</div>
	);
}

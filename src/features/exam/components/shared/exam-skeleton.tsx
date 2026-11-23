/** Shown until local progress is read, so the server render and the first client render match. */
export default function ExamSkeleton() {
	return (
		<div aria-busy="true" className="space-y-4">
			<span className="sr-only">Učitavam probni ispit</span>
			<div className="h-40 animate-pulse rounded-[1.6rem] bg-muted" />
			<div className="h-28 animate-pulse rounded-[1.4rem] bg-muted" />
			<div className="h-28 animate-pulse rounded-[1.4rem] bg-muted" />
		</div>
	);
}

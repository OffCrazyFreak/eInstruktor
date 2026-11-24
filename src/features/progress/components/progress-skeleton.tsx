export default function ProgressSkeleton() {
	return (
		<div aria-busy="true" className="mt-5 space-y-4">
			<span className="sr-only">Učitavam tvoj napredak</span>
			<div className="h-72 animate-pulse rounded-[1.6rem] bg-muted" />
			<div className="h-40 animate-pulse rounded-[1.4rem] bg-muted" />
		</div>
	);
}

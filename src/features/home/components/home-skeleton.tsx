export default function HomeSkeleton() {
	return (
		<div aria-busy="true" className="space-y-4">
			<span className="sr-only">Učitavam tvoj napredak</span>
			<div className="h-9 w-56 animate-pulse rounded-xl bg-muted" />
			<div className="h-48 animate-pulse rounded-[1.6rem] bg-muted" />
			<div className="h-32 animate-pulse rounded-[1.4rem] bg-muted" />
		</div>
	);
}

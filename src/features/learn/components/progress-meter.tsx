interface IProgressMeterProps {
	done: number;
	total: number;
	/** False until local progress is read, so the server and the first paint show an empty meter. */
	ready: boolean;
}

export default function ProgressMeter({
	done,
	total,
	ready,
}: IProgressMeterProps) {
	const shown = ready ? done : 0;
	const share = total === 0 ? 0 : shown / total;

	return (
		<div>
			<div
				aria-hidden="true"
				className="h-1.5 overflow-hidden rounded-full bg-[#eaf3ff] dark:bg-accent"
			>
				<div
					className="h-full rounded-full bg-[#00aef3] transition-[width] duration-500"
					style={{ width: `${share * 100}%` }}
				/>
			</div>

			<p className="mt-1.5 text-[0.8rem] text-muted-foreground">
				<span className={ready ? undefined : "invisible"}>
					{shown} od {total} lekcija
				</span>
			</p>
		</div>
	);
}

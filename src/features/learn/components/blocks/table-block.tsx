interface ITableBlockProps {
	caption?: string;
	columns: string[];
	rows: string[][];
}

export default function TableBlock({
	caption,
	columns,
	rows,
}: ITableBlockProps) {
	return (
		<section
			// biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be focusable to scroll by keyboard (WCAG 2.1.1)
			tabIndex={0}
			aria-label={caption ?? "Tablica"}
			className="overflow-x-auto rounded-2xl border border-border bg-card outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60"
		>
			<table className="w-full min-w-[30rem] border-collapse text-left text-[0.94rem]">
				{caption && (
					<caption className="caption-top px-3 pt-3 pb-2 text-left font-semibold">
						{caption}
					</caption>
				)}

				<thead>
					<tr className="bg-[#eaf3ff] dark:bg-accent">
						{columns.map((column, index) => (
							<th
								// biome-ignore lint/suspicious/noArrayIndexKey: static lesson content, never reordered, and header cells can repeat or be empty
								key={index}
								scope="col"
								className="px-3 py-2.5 font-semibold"
							>
								{column}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{rows.map((row, rowIndex) => (
						<tr
							// biome-ignore lint/suspicious/noArrayIndexKey: static lesson content, never reordered
							key={rowIndex}
							className="border-t border-border align-top"
						>
							{row.map((cell, index) =>
								index === 0 ? (
									<th
										// biome-ignore lint/suspicious/noArrayIndexKey: static lesson content, never reordered
										key={index}
										scope="row"
										className="min-w-[8.5rem] px-3 py-2.5 font-semibold"
									>
										{cell}
									</th>
								) : (
									<td
										// biome-ignore lint/suspicious/noArrayIndexKey: static lesson content, never reordered
										key={index}
										className="px-3 py-2.5"
									>
										{cell}
									</td>
								),
							)}
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

import { useEffect, useState } from "react";

function readPercent(): number {
	const scrollable = document.documentElement.scrollHeight - window.innerHeight;

	return scrollable <= 0 ? 1 : Math.min(window.scrollY / scrollable, 1);
}

/** How far the page is scrolled, 0 to 1, updated at most once a frame; 0 on the server. */
export default function useReadingPercent(): number {
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		let frame = 0;

		function onScroll() {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => setPercent(readPercent()));
		}

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return percent;
}

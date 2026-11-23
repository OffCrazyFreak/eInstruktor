import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IRadioKeyProps {
	label: string;
	active: boolean;
	pressed?: boolean;
	onClick: () => void;
	className?: string;
	children: ReactNode;
}

export default function RadioKey({
	label,
	active,
	pressed,
	onClick,
	className,
	children,
}: IRadioKeyProps) {
	return (
		<button
			type="button"
			aria-label={label}
			aria-pressed={pressed}
			onClick={onClick}
			className={cn(
				"flex h-11 items-center justify-center rounded-xl bg-[#3a4253] font-mono text-[0.8rem] font-bold outline-none hover:brightness-110 focus-visible:ring-[3px] focus-visible:ring-[#00aef3]/60",
				pressed && "bg-[#0a63b0]",
				active && "ring-2 ring-[#ffb43c]",
				className,
			)}
		>
			{children}
		</button>
	);
}

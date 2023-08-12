import { tv, VariantProps } from "tailwind-variants";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

const button = tv({
	base: [
		"border-2",
		"disabled:opacity-20",
		"disabled:pointer-events-none",
		"font-medium",
		"leading-6",
		"rounded-lg",
		"text-grey-950",
		"text-slate-100",
		"tracking-wide",
		"transition-all duration-200 ease-in-out",
	],
	variants: {
		size: {
			sm: ["px-3", "py-2", "min-w-[139px]", "text-base"],
			lg: ["px-6", "py-3", "min-w-[320px]", "text-lg"],
		},
		color: {
			primary: "bg-indigo-600 hover:bg-indigo-700  active:bg-indigo-800 ",
			secondary: "bg-amber-600 hover:bg-amber-700 active:bg-amber-800",
		},
		variant: {
			filled: "text-slate-100",
			outlined:
				"bg-transparent text-current border-current hover:text-slate-100 active:text-slate-100",
			ghost:
				"bg-transparent text-current border-0 hover:bg-transparent active:bg-transparent",
		},
	},
});

type ButtonVariants = VariantProps<typeof button>;

export interface ButtonProps
	extends PropsWithChildren,
		ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonVariants {
	className?: string;
	color?: "primary" | "secondary";
}

export default function Button({
	children,
	className,
	size = "lg",
	type = "button",
	color = "primary",
	variant = "filled",
	...props
}: ButtonProps) {
	return (
		<button
			className={clsx([button({ size, color, variant }), className])}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
}

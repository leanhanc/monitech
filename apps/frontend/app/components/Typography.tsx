import { tv, type VariantProps } from "tailwind-variants";
import clsx from "clsx";

/* Types */
import { PropsWithChildren } from "react";
import { WithClassName } from "apps/frontend/@types/Props";

interface TypographyProps extends PropsWithChildren, WithClassName {
	as?: "p" | "span" | "h1" | "h2" | "h3";
}

const Paragraph = tv({
	base: "font-body",
	variants: {
		variant: {
			subheading: "font-medium text-slate-500",
		},
	},
});

const Title = tv({
	base: "font-semibold text-white rounded-full active:opacity-80",
	variants: {
		color: {
			primary: "bg-blue-500 hover:bg-blue-700",
			secondary: "bg-purple-500 hover:bg-purple-700",
			success: "bg-green-500 hover:bg-green-700",
		},
		size: {
			small: "py-0 px-2 text-xs",
			medium: "py-1 px-3 text-sm",
			large: "py-1.5 px-3 text-md",
		},
	},
});

type TypographyVariants = VariantProps<typeof Paragraph> &
	VariantProps<typeof Title>;

export default function Typography({
	as = "p",
	children,
	className,
	variant,
}: TypographyProps & TypographyVariants) {
	const TypographyComponent = as;

	if (as === "p" || as === "span") {
		return (
			<TypographyComponent className={clsx(Paragraph({ variant }), className)}>
				{children}
			</TypographyComponent>
		);
	}

	return (
		<TypographyComponent className={clsx(Title(), className)}>
			{children}
		</TypographyComponent>
	);
}

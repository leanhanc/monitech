import { tv, type VariantProps } from "tailwind-variants";
import clsx from "clsx";

/* Types */
import { PropsWithChildren } from "react";
import { WithClassName } from "apps/frontend/@types/Props";

interface TypographyProps extends PropsWithChildren, WithClassName {
	as?: "p" | "span" | "h1" | "h2" | "h3";
}

const paragraph = tv({
	base: "font-body leading-6 tracking-wide",
	variants: {
		variant: {
			subheading:
				"font-medium text-slate-800 tracking-wide text-lg md:text-2xl",
			"long-subheading": "font-normal text-slate-600 tracking-wide text-md",
		},
	},
});

type ParagraphVariants = VariantProps<typeof paragraph>;

const title = tv({
	base: "font-title leading-6 font-medium",
	variants: {
		variant: {
			main: "text-slate-900 text-2xl md:text-4xl lg:text-5xl",
			"card-header": "text-slate-800 font-medium text-xl md:text-3xl lg:4lx",
		},
	},
});

type TitleVariants = VariantProps<typeof title>;

function Paragraph({
	as = "p",
	children,
	className,
	variant,
}: TypographyProps & ParagraphVariants) {
	const ParagraphComponent = as;

	return (
		<ParagraphComponent className={clsx(paragraph({ variant }), className)}>
			{children}
		</ParagraphComponent>
	);
}

function Title({
	as = "h1",
	children,
	className,
	variant,
}: TypographyProps & TitleVariants) {
	const TitleComponent = as;

	return (
		<TitleComponent className={clsx(title({ variant }), className)}>
			{children}
		</TitleComponent>
	);
}

const Typography = {
	Paragraph,
	Title,
};

export default Typography;
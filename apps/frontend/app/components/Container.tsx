import clsx from "clsx";

/* Types */
import { PropsWithChildren } from "react";
import { WithClassName } from "apps/frontend/@types/Props";

interface ContainterProps extends PropsWithChildren, WithClassName {
	as?: "header" | "main" | "nav" | "footer" | "div";
}

export default function Container({
	children,
	className,
	as = "div",
}: ContainterProps) {
	const ContainerComponent = as;

	return (
		<ContainerComponent className={clsx("p-4 md:p-6: lg:p-8", className)}>
			{children}
		</ContainerComponent>
	);
}

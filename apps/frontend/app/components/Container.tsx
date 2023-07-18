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
		<ContainerComponent
			className={clsx(
				"md:p-6: mx-auto p-4 md:max-w-screen-xl lg:p-8",
				className,
			)}
		>
			{children}
		</ContainerComponent>
	);
}

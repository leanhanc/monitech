/* Types */
import { WithClassName } from "apps/frontend/@types/Props";

/* Components */
import Typography from "@frontend/components/Typography";

/* Utils */
import { cn } from "apps/frontend/lib/utils";

interface CardProps extends WithClassName {
	title?: string;
}

export default function Card({ children, title, className }: CardProps) {
	return (
		<article
			className={cn(
				"w-full rounded-lg bg-slate-50 p-6 shadow-sm md:max-w-xs",
				className,
			)}
		>
			{title && (
				<Typography.Title variant="card-header" as="h2" className="mb-8">
					{title}
				</Typography.Title>
			)}
			<div>{children}</div>
		</article>
	);
}

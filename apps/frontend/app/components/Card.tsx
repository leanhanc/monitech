import { WithClassName } from "apps/frontend/@types/Props";

/* Components */
import Typography from "@frontend/components/Typography";

interface CardProps extends WithClassName {
	title?: string;
}

export default function Card({ children, title }: CardProps) {
	return (
		<article className="mt-12 w-full rounded-lg bg-slate-50 p-6 shadow-sm md:max-w-xs">
			{title && (
				<Typography.Title variant="card-header" as="h2" className="mb-8">
					{title}
				</Typography.Title>
			)}
			{children}
		</article>
	);
}

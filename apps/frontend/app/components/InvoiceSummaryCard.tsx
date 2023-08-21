import NextLink from "next/link";

/* Icons */
import { ArrowRightIcon } from "lucide-react";

/* Components */
import Card from "@frontend/components/Card";
import Typography from "@frontend/components/Typography";

/* Types */
import { SummaryData } from "@frontend/dashboard/page";
import { WithClassName } from "apps/frontend/@types/Props";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

interface InvoiceSummaryCardProps extends WithClassName {
	currentPeriodSummary: SummaryData;
}

export default function InvoiceSummaryCard({
	currentPeriodSummary,
}: InvoiceSummaryCardProps) {
	/* Derived State */
	const currentPeriodTotal = currentPeriodSummary?.reduce((prev, curr) => {
		return prev + parseFloat(curr.amount);
	}, 0);

	/* Helpers */
	const currencyFormatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	return (
		<Card title="Resumen Anual">
			<ul>
				{currentPeriodSummary.map((period) => {
					return (
						<li key={period.year} className="mb-8 flex">
							<Typography.Paragraph
								as="h3"
								className="font-medium text-slate-600"
							>
								{period.year}
							</Typography.Paragraph>
							<p className="ml-auto block text-indigo-400">
								{currencyFormatter.format(parseFloat(period.amount))}
							</p>
						</li>
					);
				})}
			</ul>

			<div className="flex w-full items-center justify-between">
				<strong className="text-xl font-medium">Total</strong>
				{currentPeriodTotal && (
					<strong className="text-xl font-bold tracking-wide text-emerald-600">
						{currencyFormatter.format(currentPeriodTotal)}
					</strong>
				)}
			</div>

			<footer className="mt-12 flex justify-end">
				<NextLink
					href={ROUTES.INVOICES.LIST}
					className="ml-auto flex text-indigo-700"
				>
					Ver Detalle
					<ArrowRightIcon className="ml-1 text-indigo-700 hover:text-indigo-800" />
				</NextLink>
			</footer>
		</Card>
	);
}

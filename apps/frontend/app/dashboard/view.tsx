import NextLink from "next/link";
import { format } from "date-fns";
import es from "date-fns/locale/es";

/* Icons */
import { ArrowRightIcon } from "lucide-react";

/* Components */
import Container from "@frontend/components/Container";
import Typography from "@frontend/components/Typography";

/* Types */
import { SummaryData } from "@frontend/dashboard/page";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";
import Link from "next/link";

interface DashboardViewProps {
	currentPeriodSummary?: SummaryData;
}

export default async function DashboardView({
	currentPeriodSummary,
}: DashboardViewProps) {
	/* Derived State */
	const canShowCurrentPeriodSummary =
		currentPeriodSummary && currentPeriodSummary.length > 0;
	const currentPeriodTotal = currentPeriodSummary?.reduce((prev, curr) => {
		return prev + parseFloat(curr.amount);
	}, 0);

	/* Helpers */
	const currencyFormatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	return (
		<Container as="main">
			<Typography.Title variant="main" as="h1">
				Mi Moni 💸
			</Typography.Title>

			{canShowCurrentPeriodSummary ? (
				<article className="mt-12 w-full rounded-lg bg-slate-50 p-6 shadow-sm md:max-w-xs">
					<Typography.Title variant="card-header" as="h2" className="mb-8">
						Resumen Anual
					</Typography.Title>

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
				</article>
			) : (
				<article className="mt-12 w-full rounded-lg bg-slate-50 p-6 md:max-w-xs">
					<Typography.Title variant="card-header" as="h2" className="mb-4">
						Resumen Anual
					</Typography.Title>
					<p className="mb-6 flex items-center justify-center font-light">
						Aún no has cargado ninguna factura en este último año 😢
					</p>
					<NextLink href={ROUTES.INVOICES.NEW} className="flex text-indigo-700">
						Cargar mi primer factura
						<ArrowRightIcon className="ml-1 text-indigo-700 hover:text-indigo-800" />
					</NextLink>
				</article>
			)}
		</Container>
	);
}

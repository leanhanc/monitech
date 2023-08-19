import NextLink from "next/link";
import { format } from "date-fns";

/* Icons */
import { ArrowRightIcon } from "lucide-react";

/* Components */
import Container from "@frontend/components/Container";
import Typography from "@frontend/components/Typography";

/* Types */
import { TransctionPeriodData } from "@frontend/dashboard/page";
import es from "date-fns/locale/es";
import { calculateTotalAmount } from "@frontend/lib/utils/calculations";
import ROUTES from "@frontend/lib/utils/routes";

interface DashboardViewProps {
	currentPeriodInvoices?: TransctionPeriodData;
}

export default async function DashboardView({
	currentPeriodInvoices,
}: DashboardViewProps) {
	/* Renders */
	const canShowCurrentPeriodInvoices =
		currentPeriodInvoices && Object.keys(currentPeriodInvoices).length > 0;
	const currencyFormatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	const currentPeriodTotal =
		currentPeriodInvoices && calculateTotalAmount(currentPeriodInvoices);

	return (
		<Container as="main">
			<Typography.Title variant="main" as="h1">
				Mi Moni 💸
			</Typography.Title>

			{canShowCurrentPeriodInvoices ? (
				<article className="mt-12 w-full rounded-lg bg-slate-200 p-6 md:max-w-xs">
					<Typography.Title variant="card-header" as="h2" className="mb-8">
						Resumen Anual
					</Typography.Title>

					{Object.entries(currentPeriodInvoices).map(([year, invoices]) => {
						return (
							<div key={year.toString()} className="mb-8">
								<Typography.Paragraph
									as="h3"
									className="text-lg font-bold text-slate-700"
								>
									{year}
								</Typography.Paragraph>
								{invoices.map((invoice) => (
									<li key={invoice.id} className="my-3 flex">
										<p className="font-medium text-slate-600">
											{format(new Date(invoice.date), "dd-MM", { locale: es })}
										</p>
										<strong className="ml-auto block text-indigo-400">
											{currencyFormatter.format(parseFloat(invoice.amount))}
										</strong>
									</li>
								))}
							</div>
						);
					})}
					<div className="flex w-full items-center justify-between">
						<p className="text-xl font-medium">Total</p>
						{currentPeriodTotal && (
							<strong className="text-2xl font-bold tracking-wide text-emerald-600">
								{currencyFormatter.format(currentPeriodTotal)}
							</strong>
						)}
					</div>
				</article>
			) : (
				<article className="mt-12 w-full rounded-lg bg-slate-200 p-6 md:max-w-xs">
					<Typography.Title variant="card-header" as="h2" className="mb-4">
						Resumen Anual
					</Typography.Title>
					<p className="mb-6 flex items-center justify-center font-light">
						Aún no has cargado ninguna factura en este último año 😢
					</p>
					<NextLink href={ROUTES.INVOICES.NEW} className="flex text-indigo-700">
						Cargar mi primer factura
						<ArrowRightIcon className="ml-1 text-indigo-700" />
					</NextLink>
				</article>
			)}
		</Container>
	);
}

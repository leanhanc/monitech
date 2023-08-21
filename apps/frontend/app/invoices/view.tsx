import NextLink from "next/link";

/* Icons */
import { ArrowRightIcon } from "lucide-react";

/* Components */
import Container from "@frontend/components/Container";
import Typography from "@frontend/components/Typography";

/* Types */
import { Invoice } from "@monitech/types";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";
import { API } from "apps/frontend/lib/utils";

/* Config */
import { SESSION_TOKEN_NAME } from "apps/frontend/config";

interface InvoicesViewProps {
	invoices?: Invoice[];
}

export default async function InvoicesView({ invoices }: InvoicesViewProps) {
	/* Helpers */
	const currencyFormatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	return (
		<Container as="main">
			<Typography.Title variant="main" as="h1">
				Mis Facturas 🧾
			</Typography.Title>

			{invoices && invoices.length > 0 ? (
				<article className="mt-12 w-full rounded-lg bg-slate-50 p-6 md:max-w-xs">
					Invoice List
				</article>
			) : (
				<article className="mt-12 w-full rounded-lg bg-slate-50 p-6 md:max-w-xs">
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

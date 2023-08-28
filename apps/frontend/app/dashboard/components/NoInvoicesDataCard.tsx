import NextLink from "next/link";

/* Icons */
import { ArrowRightIcon } from "lucide-react";

/* Components */
import Typography from "@frontend/components/Typography";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

export default function NoInvoicesDataCard() {
	return (
		<article className="mt-12 w-full rounded-lg bg-slate-50 p-6 md:max-w-xs">
			<Typography.Title variant="card-header" as="h2" className="mb-4">
				Resumen Anual
			</Typography.Title>
			<p className="mb-6 flex items-center justify-center font-light">
				Aún no has cargado ninguna factura en este último año 😢
			</p>
			<NextLink
				href={ROUTES.INVOICES.NEW.ROOT}
				className="flex text-indigo-700"
			>
				Cargar mi primer factura
				<ArrowRightIcon className="ml-1 text-indigo-700 hover:text-indigo-800" />
			</NextLink>
		</article>
	);
}

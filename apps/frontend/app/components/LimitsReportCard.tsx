import NextLink from "next/link";

/* Icons */
import { ArrowRightIcon } from "lucide-react";

/* Components */
import Card from "@frontend/components/Card";
import Typography from "@frontend/components/Typography";

/* Types */
import { LimitsReport } from "@monitech/types";
import { WithClassName } from "apps/frontend/@types/Props";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

interface LimitsReportCardProps extends WithClassName {
	limits: LimitsReport;
}

export default function LimitsReportCard({ limits }: LimitsReportCardProps) {
	/* Helpers */
	const currencyFormatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	return (
		<Card title="Reporte de Límites">
			<p>
				<span>{currencyFormatter.format(limits.ars)}</span> de{" "}
				{currencyFormatter.format(limits.limit)}
			</p>
		</Card>
	);
}

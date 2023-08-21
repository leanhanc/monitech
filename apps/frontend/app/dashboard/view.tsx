/* Components */
import Container from "@frontend/components/Container";
import Typography from "@frontend/components/Typography";
import NoInvoicesDataCard from "@frontend/dashboard/components/NoInvoicesDataCard";

/* Types */
import { SummaryData } from "@frontend/dashboard/page";

/* Utils */
import InvoiceSummaryCard from "@frontend/components/InvoiceSummaryCard";

interface DashboardViewProps {
	currentPeriodSummary?: SummaryData;
}

export default async function DashboardView({
	currentPeriodSummary,
}: DashboardViewProps) {
	const canShowCurrentPeriodSummary =
		currentPeriodSummary && currentPeriodSummary.length > 0;

	return (
		<Container as="main">
			<Typography.Title variant="main" as="h1">
				Mi Moni 💸
			</Typography.Title>

			{canShowCurrentPeriodSummary ? (
				<InvoiceSummaryCard currentPeriodSummary={currentPeriodSummary} />
			) : (
				<NoInvoicesDataCard />
			)}
		</Container>
	);
}

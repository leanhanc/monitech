import { Invoice } from "@monitech/types";

export function buildCurrentPeriodSummary(data: {
	[year: number]: Pick<Invoice, "amount">[];
}) {
	if (!data) {
		return 0;
	}

	const allInvoices = Object.values(data).flatMap((invoices) => invoices);
	const totalAmount = allInvoices.reduce(
		(sum, invoice) => sum + parseFloat(invoice.amount),
		0,
	);

	return {
		total: totalAmount,
	};
}

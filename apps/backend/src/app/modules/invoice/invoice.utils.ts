import { Invoice } from "@monitech/types";

export function groupInvoicesByYear(invoices: Pick<Invoice, "date">[]) {
	const invoicesByYear: { [year: number]: Partial<Invoice>[] } =
		invoices.reduce(
			(result, invoice) => {
				const year = new Date(invoice.date).getFullYear();

				if (!result[year]) {
					result[year] = [];
				}

				result[year].push(invoice);
				return result;
			},
			{} as { [year: number]: Pick<Invoice, "date">[] },
		);

	return invoicesByYear;
}

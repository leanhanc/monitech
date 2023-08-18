interface InvoicesFromDb {
	id: number;
	date: string;
	amount: string;
	currency: "ARS" | "USD" | null;
}

export function groupInvoicesByYear(invoices: InvoicesFromDb[]) {
	const invoicesByYear: { [year: number]: InvoicesFromDb[] } = invoices.reduce(
		(result, invoice) => {
			const year = new Date(invoice.date).getFullYear();

			if (!result[year]) {
				result[year] = [];
			}

			result[year].push(invoice);
			return result;
		},
		{} as { [year: number]: InvoicesFromDb[] },
	);

	return invoicesByYear;
}

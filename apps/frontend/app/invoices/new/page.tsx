/* View */
import NewInvoiceView from "@frontend/invoices/new/view";

/* Components */
import Container from "@frontend/components/Container";

export default async function NewInvoicePage() {
	return (
		<Container className="flex min-h-full flex-col" as="main">
			<NewInvoiceView />
		</Container>
	);
}

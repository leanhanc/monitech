/* Components */
import Container from "@frontend/components/Container";
import NewInvoiceForm from "@frontend/invoice/new/components/NewInvoiceForm";
import NewInvoiceHeader from "@frontend/invoice/new/components/NewInvoiceHeader";

export default async function NewInvoiceView() {
	return (
		<Container className="flex min-h-full flex-col justify-center" as="main">
			<div className="w-1/2">
				<NewInvoiceHeader />
				<NewInvoiceForm />
			</div>
		</Container>
	);
}

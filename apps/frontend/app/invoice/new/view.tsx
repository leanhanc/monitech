/* Components */
import Container from "@frontend/components/Container";
import NewInvoiceHeader from "@frontend/invoice/new/components/NewInvoiceHeader";

export default async function NewInvoiceView() {
	return (
		<Container>
			<NewInvoiceHeader />
		</Container>
	);
}

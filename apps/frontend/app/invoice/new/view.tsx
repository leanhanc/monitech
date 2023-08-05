/* Components */
import Container from "@frontend/components/Container";
import NewInvoiceForm from "@frontend/invoice/new/components/NewInvoiceForm";
import NewInvoiceHeader from "@frontend/invoice/new/components/NewInvoiceHeader";

export default async function NewInvoiceView() {
	return (
		<Container className="flex h-full flex-col justify-center md:max-w-[50%]">
			<NewInvoiceHeader />
			<NewInvoiceForm />
		</Container>
	);
}

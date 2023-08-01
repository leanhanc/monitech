import Typography from "@frontend/components/Typography";
export default function NewInvoiceHeader() {
	return (
		<header>
			<Typography.Title variant="main" as="h1">
				Nueva Factura 🧾
			</Typography.Title>
			<Typography.Paragraph variant="long-subheading" as="p" className="mt-6">
				Cargá los datos de tu nueva facturación. Si se trata de una exportación
				de servicios al exterior y la liquidaste en USD (recibiste los 💵 en tu
				cuenta en USD sin pesificar), se descontará automáticamente el monto del
				cupo anual.
			</Typography.Paragraph>
		</header>
	);
}

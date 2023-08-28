import Typography from "@frontend/components/Typography";
export default function NewInvoiceHeader() {
	return (
		<header>
			<Typography.Title variant="main" as="h1">
				Nueva Factura 🧾
			</Typography.Title>
			<Typography.Paragraph variant="long-subheading" as="p" className="mt-6">
				{/* Cargá los datos de tu nueva factura. El importe que ingreses lo usaremos
				para ayudarte con las recategorizaciones y que nunca te pases del límite
				del régimen del monotributo.
				<br /> Si el monto de la factura lo liquidaste en USD (recibiste los 💵
				en tu cuenta en USD sin pesificar), se descontará automáticamente el
				monto del cupo anual. */}
				Elegí el tipo de factura que vas a cargar.
			</Typography.Paragraph>
		</header>
	);
}

import Typography from "@frontend/components/Typography";
export default function NewInvoiceHeader() {
	return (
		<header>
			<Typography.Title variant="main" as="h1">
				Nueva Factura 🧾
			</Typography.Title>
			<Typography.Paragraph
				variant="long-subheading"
				as="p"
				className="mt-8 rounded-lg bg-slate-200 p-4"
			>
				Cargá los datos de tu nueva factura expresada <strong>en Pesos</strong>.
				El importe que ingreses lo usaremos para ayudarte con las
				recategorizaciones y que nunca te pases del límite del régimen del
				monotributo. Si se trata de una exportación de servicios al exterior y
				la liquidaste en USD (recibiste los 💵 en tu cuenta en USD sin
				pesificar), se descontará automáticamente el monto del cupo anual.
			</Typography.Paragraph>
		</header>
	);
}

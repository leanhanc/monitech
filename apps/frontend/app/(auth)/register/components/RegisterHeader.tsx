import Typography from "@frontend/components/Typography";

export default function RegisterHeader() {
	return (
		<header>
			<Typography.Title variant="main" as="h1">
				Creá tu Cuenta
			</Typography.Title>
			<Typography.Paragraph
				variant="subheading"
				as="p"
				className="mt-6 max-w-[90%]"
			>
				🔐 Te pedimos que te registres para que sólo vos puedas acceder a tus
				datos .
			</Typography.Paragraph>
		</header>
	);
}

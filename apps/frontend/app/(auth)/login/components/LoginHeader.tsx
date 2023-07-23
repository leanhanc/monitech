import Typography from "@frontend/components/Typography";

export default function LoginHeader() {
	return (
		<header className="w-full md:w-1/2">
			<Typography.Title variant="main" as="h1">
				Ingresá con tu Cuenta
			</Typography.Title>
			<Typography.Paragraph
				variant="subheading"
				as="p"
				className="mt-6 max-w-[90%]"
			>
				🔐 Para acceder a tus datos identificate con tu e-mail y contraseña.
			</Typography.Paragraph>
		</header>
	);
}

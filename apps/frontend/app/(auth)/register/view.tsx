import Container from "@frontend/components/Container";
import Typography from "@frontend/components/Typography";

export default function RegisterView() {
	return (
		<Container as="main">
			<header>
				<h1>Creá tu cuenta</h1>
				<Typography variant="subheading">
					Sos dev, ya sabés de que va esto, ¿no? Necesitamos que te registres
					para que sólo vos puedas acceder a tus datos.
				</Typography>
			</header>
		</Container>
	);
}

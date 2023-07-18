/* Components */
import Container from "@frontend/components/Container";
import RegisterForm from "@frontend/(auth)/register/components/RegisterForm";
import RegisterHeader from "@frontend/(auth)/register/components/RegisterHeader";

export default function RegisterView() {
	return (
		<Container as="main" className="flex min-h-full flex-col justify-center">
			<RegisterHeader />
			<RegisterForm />
		</Container>
	);
}

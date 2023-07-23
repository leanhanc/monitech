/* Components */
import Container from "@frontend/components/Container";
import LoginHeader from "@frontend/(auth)/login/components/LoginHeader";
import LoginForm from "@frontend/(auth)/login/components/LoginForm";

export default function LoginView() {
	return (
		<Container as="main" className="flex min-h-full flex-col justify-center">
			<LoginHeader />
			<LoginForm />
		</Container>
	);
}

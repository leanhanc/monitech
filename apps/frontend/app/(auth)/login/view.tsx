import NextImage from "next/image";

/* Components */
import Container from "@frontend/components/Container";
import LoginHeader from "@frontend/(auth)/login/components/LoginHeader";
import LoginForm from "@frontend/(auth)/login/components/LoginForm";
import LoginFooter from "@frontend/(auth)/login/components/LoginFooter";

/* Assets */
import BackgroundImage from "../../../public/freelancer1.jpg";

export default function LoginView() {
	return (
		<>
			<Container as="main" className="flex min-h-full flex-col justify-center">
				<LoginHeader />
				<LoginForm />
				<LoginFooter />
			</Container>
			<div
				aria-hidden
				className="absolute left-1/2 top-0 hidden h-screen w-1/2 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 md:block "
			/>
			<NextImage
				aria-hidden
				className="absolute left-1/2 top-0 hidden h-screen w-1/2 object-cover opacity-90 md:block "
				src={BackgroundImage}
				alt="Freelancer trabajando"
			/>
		</>
	);
}

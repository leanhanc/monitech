import NextImage from "next/image";

/* Components */
import Container from "@frontend/components/Container";
import RegisterHeader from "@frontend/(auth)/register/components/RegisterHeader";
import RegisterForm from "@frontend/(auth)/register/components/RegisterForm";
import RegisterFooter from "@frontend/(auth)/register/components/RegisterFooter";

/* Assets */
import BackgroundImage from "../../../public/freelancer2.png";

export default function RegisterView() {
	return (
		<>
			<Container as="main" className="flex min-h-full flex-col justify-center">
				<RegisterHeader />
				<RegisterForm />
				<RegisterFooter />
			</Container>
			<NextImage
				aria-hidden
				className="absolute left-1/2 top-0 hidden h-screen w-1/2 object-cover opacity-90 md:block"
				src={BackgroundImage}
				alt="Freelancer trabajando"
			/>
			<div
				aria-hidden
				className="absolute left-1/2 top-0 hidden h-screen w-1/2 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 md:flex"
			/>
		</>
	);
}

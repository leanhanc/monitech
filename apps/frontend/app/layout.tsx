import "@frontend/styles/global.css";
import clsx from "clsx";
import { Montserrat, Source_Sans_3 } from "next/font/google";

export const metadata = {
	title: "Monodev",
	description: "Herramientas de control contable para devs monotributistas.",
};

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "auto",
	weight: ["300", "400", "500", "700"],
	variable: "--font-montserrat",
});

const sourceSansPro = Source_Sans_3({
	subsets: ["latin"],
	display: "auto",
	weight: ["300", "400", "500", "700"],
	variable: "--font-source-sans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="es"
			className={`${montserrat.variable} ${sourceSansPro.variable}`}
		>
			<body>{children}</body>
		</html>
	);
}

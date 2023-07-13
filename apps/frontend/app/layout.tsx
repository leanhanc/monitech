export const metadata = {
	title: "Monodev",
	description: "Herramientas de control contable para devs monotributistas.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body>{children}</body>
		</html>
	);
}

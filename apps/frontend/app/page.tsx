import NextLink from "next/link";
export default async function HomePage() {
	return (
		<main className="min-h-full bg-slate-100">
			<NextLink href="/register" className="font-title">
				IR AL FORMULARIO DE REGISTRO
			</NextLink>
			<NextLink href="/dashboard" className="font-title">
				IR AL DASHBOARD
			</NextLink>

			<NextLink href="/invoice/new" className="font-title">
				NUEVA FACTURA
			</NextLink>
		</main>
	);
}

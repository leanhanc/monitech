import NextLink from "next/link";
export default async function HomePage() {
	return (
		<main className="bg-slate-100 min-h-full">
			<NextLink href="/register" className="font-title">
				IR AL FORMULARIO DE REGISTRO
			</NextLink>
		</main>
	);
}

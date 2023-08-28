import NextLink from "next/link";

/* Components */
import Container from "@frontend/components/Container";
import Typography from "@frontend/components/Typography";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

export default async function NewInvoiceView() {
	return (
		<Container className="flex min-h-full flex-col" as="main">
			<header>
				<Typography.Title variant="main" as="h1">
					Nueva Factura 🧾
				</Typography.Title>
				<Typography.Paragraph variant="long-subheading" as="p" className="mt-6">
					Elegí el tipo de factura que vas a cargar
				</Typography.Paragraph>
			</header>
			<ul className="mt-12 flex w-1/2 gap-2">
				<li>
					<NextLink
						href={ROUTES.INVOICES.NEW.C}
						className="flex flex-col items-center justify-center gap-1 rounded-md border-2 border-slate-500 bg-slate-50 p-2 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-md"
					>
						<span>FACTURA</span>
						<strong className="text-4xl font-bold">C</strong>
					</NextLink>
				</li>
				<li>
					<NextLink
						href={ROUTES.INVOICES.NEW.E}
						className="flex flex-col items-center justify-center gap-1 rounded-md border-2 border-slate-500 bg-slate-50 p-2 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-md"
					>
						<span>FACTURA</span>
						<strong className="text-4xl font-bold">E</strong>
					</NextLink>
				</li>
			</ul>
		</Container>
	);
}

import NextLink from "next/link";

/* Components */
import Typography from "@frontend/components/Typography";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

export default function RegisterFooter() {
	return (
		<footer className="mt-8">
			<Typography.Paragraph>
				¿Ya tenés una cuenta?
				<NextLink
					href={ROUTES.LOGIN}
					className="text-indigo-600 hover:text-indigo-700"
				>
					{" "}
					Ingresá.
				</NextLink>
			</Typography.Paragraph>
		</footer>
	);
}

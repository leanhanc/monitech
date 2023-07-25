import NextLink from "next/link";

/* Components */
import Typography from "@frontend/components/Typography";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

export default function LoginFooter() {
	return (
		<footer className="mt-8">
			<Typography.Paragraph>
				¿No tenés una cuenta?
				<NextLink
					href={ROUTES.REGISTER}
					className="text-indigo-600 hover:text-indigo-700"
				>
					{" "}
					Registrate.
				</NextLink>
			</Typography.Paragraph>
		</footer>
	);
}

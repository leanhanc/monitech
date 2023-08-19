"use client";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* Components */
import { TextInput } from "@frontend/components/TextInput";
import Button from "@frontend/components/Button";
import Typography from "@frontend/components/Typography";

/* Actions */
import { login } from "../action";

/* Icons */
import {
	EyeIcon,
	EyeSlashIcon,
} from "@frontend/(auth)/register/components/icons";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

export const formSchema = z.object({
	email: z
		.string()
		.email({ message: "Por favor ingresá un e-mail válido." })
		.nonempty({ message: "Por favor ingresá tu e-mail." }),
	password: z
		.string()
		.nonempty({ message: "Por favor ingresá tu contraseña." }),
});

export default function LoginForm() {
	const [isHiddingPassword, setIsHiddingPassword] = useState(true);

	// Hooks
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const {
		formState,
		handleSubmit,
		register: registerField,
		setError,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(formData: z.infer<typeof formSchema>) {
		startTransition(async () => {
			const result = await login(formData);

			if (result?.error) {
				setError(result.error.field, { message: result.error.message });
				return;
			}

			router.push(ROUTES.DASHBOARD);
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
			<TextInput
				label="E-mail"
				className="mt-10"
				isFullWidth={false}
				errorMessage={formState.errors.email?.message}
				{...registerField("email")}
			/>

			<TextInput
				className="mt-10"
				Icon={
					isHiddingPassword ? (
						<EyeSlashIcon className="[&>*]:fill-slate-600" />
					) : (
						<EyeIcon className="[&>*]:fill-slate-600" />
					)
				}
				iconLabel="Mostrar o esconder contraseña"
				isFullWidth={false}
				label="Contraseña"
				onIconClick={() => setIsHiddingPassword((current) => !current)}
				type={isHiddingPassword ? "password" : "text"}
				errorMessage={formState.errors.password?.message}
				{...registerField("password")}
			/>

			<Button
				variant="filled"
				type="submit"
				className="mt-12"
				disabled={isPending}
			>
				{isPending ? "Eviando..." : "Ingresar"}
			</Button>

			{formState.errors.root && (
				<Typography.Paragraph className="mt-4 text-base font-medium text-red-700">
					{formState.errors.root.message}
				</Typography.Paragraph>
			)}
		</form>
	);
}

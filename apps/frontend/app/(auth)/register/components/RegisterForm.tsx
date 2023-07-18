"use client";
import { PropsWithChildren, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* Components */
import { TextInput } from "@frontend/components/TextInput";
import Button from "@frontend/components/Button";

/* Actions */
import { register } from "../action";

/* Icons */
import {
	EyeIcon,
	EyeSlashIcon,
} from "@frontend/(auth)/register/components/icons";

export type RegisterProps = PropsWithChildren;

export const formSchema = z.object({
	email: z
		.string()
		.email({ message: "Ingresá un e-mail válido." })
		.min(3, { message: "Ingresá un e-mail válido." }),
	password: z.string().min(6, {
		message: "Ingresá una contraseña de al menos 6 caracteres.",
	}),
	name: z.string().min(3, {
		message: "Tu nombre de usuario debe tener al menos 3 caracteres.",
	}),
});

export default function RegisterForm() {
	const [isHiddingPassword, setIsHiddingPassword] = useState(true);

	// Hooks
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const {
		formState,
		handleSubmit,
		register: registerField,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(formData: z.infer<typeof formSchema>) {
		startTransition(async () => {
			const isSuccessful = await register(formData);

			if (isSuccessful) {
				router.push("/");
			}
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				label="Nombre de usuario"
				className="mt-10"
				isFullWidth={false}
				errorMessage={formState.errors.name?.message}
				{...registerField("name")}
			/>

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

			<Button variant="primary" type="submit" className="mt-12">
				{isPending ? "Eviando..." : "Enviar"}
			</Button>
		</form>
	);
}

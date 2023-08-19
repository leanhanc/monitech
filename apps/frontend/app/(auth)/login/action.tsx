"use server";

import { cookies } from "next/headers";
import * as z from "zod";

// Types
import { formSchema } from "@frontend/(auth)/login/components/LoginForm";

// Config
import { API_BASE_HEADERS, API_BASE_URL } from "apps/frontend/config";

export async function login(data: z.infer<typeof formSchema>): Promise<
	| {
			error: {
				field: keyof typeof data | "root";
				message: string;
			};
	  }
	| {
			error: null;
	  }
> {
	const jsonResponse = await fetch(`${API_BASE_URL}/auth/local/login`, {
		headers: API_BASE_HEADERS,
		method: "POST",
		body: JSON.stringify({
			email: data.email,
			password: data.password,
		}),
	}).catch((e) => {
		console.log("login:", e);
	});

	if (jsonResponse) {
		const response: {
			sessionToken?: string;
			idToken?: string;
			statusCode?: number;
		} = await jsonResponse.json();

		if (response.statusCode && response.statusCode >= 400) {
			return {
				error: {
					field: "root",
					message: "Algún dato de los que ingresaste no es correcto.",
				},
			};
		}

		if (response.idToken && response.sessionToken) {
			const expirationDate = new Date();
			expirationDate.setFullYear(expirationDate.getFullYear() + 1);

			cookies().set({
				name: "midt",
				value: response.idToken,
				expires: expirationDate,
			});
			cookies().set({
				name: "mst",
				value: response.sessionToken,
				expires: expirationDate,
			});

			return { error: null };
		}

		return {
			error: {
				field: "password",
				message:
					"Ocurrió un error desconocido. Por favor intentá nuevamente más tarde.",
			},
		};
	}

	return {
		error: {
			field: "root",
			message:
				"Hubo un error al procesar tu solicitud. Por favor, intentá nuevamente más tarde.",
		},
	};
}

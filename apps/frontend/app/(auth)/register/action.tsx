"use server";

import { cookies } from "next/headers";
import * as z from "zod";

// Types
import { formSchema } from "@frontend/(auth)/register/components/RegisterForm";

// Config
import {
	API_BASE_HEADERS,
	API_BASE_URL,
	ID_TOKEN_NAME,
	SESSION_TOKEN_MAME,
} from "apps/frontend/config";

export async function register(data: z.infer<typeof formSchema>): Promise<
	| {
			error: {
				field: keyof typeof data;
				message: string;
			};
	  }
	| {
			error: null;
	  }
> {
	const jsonResponse = await fetch(`${API_BASE_URL}/auth/local/register`, {
		headers: API_BASE_HEADERS,
		method: "POST",
		body: JSON.stringify({
			email: data.email,
			name: data.name,
			password: data.password,
		}),
	}).catch((e) => {
		console.log("register:", e);
	});

	if (jsonResponse) {
		const response: {
			sessionToken?: string;
			idToken?: string;
			error: string;
		} = await jsonResponse.json();

		if (response.error && response.error === "Conflict") {
			return {
				error: { field: "email", message: "Este e-mail ya está en uso." },
			};
		}

		if (response.idToken && response.sessionToken) {
			cookies().set({ name: ID_TOKEN_NAME, value: response.idToken });
			cookies().set({ name: SESSION_TOKEN_MAME, value: response.sessionToken });

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

	return { error: null };
}

"use server";

import { cookies } from "next/headers";
import * as z from "zod";

// Types
import { formSchema } from "@frontend/(auth)/register/components/RegisterForm";

// Config
import { API_BASE_HEADERS, API_BASE_URL } from "apps/frontend/config";

export async function register(data: z.infer<typeof formSchema>) {
	const jsonResponse = await fetch(`${API_BASE_URL}/auth/local`, {
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
		const response: { sessionToken: string; idToken: string } =
			await jsonResponse.json();

		if (response.idToken && response.sessionToken) {
			cookies().set({ name: "midt", value: response.idToken });
			cookies().set({ name: "mst", value: response.sessionToken });

			return true;
		}

		return false;
	}
}

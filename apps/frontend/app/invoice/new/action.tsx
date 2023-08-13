"use server";
import { cookies } from "next/headers";

/* Utils */
import { API } from "apps/frontend/lib/utils";
import { SESSION_TOKEN_MAME } from "apps/frontend/config";

export async function createInvoice({
	date,
	amount,
}: {
	date: string;
	amount: string;
}) {
	const token = await cookies().get(SESSION_TOKEN_MAME)?.value;
	if (!token) return;

	const response = await API<{ id: number }>(
		"/invoice",
		{
			method: "POST",
			body: JSON.stringify({ date, amount }),
		},
		token,
	);

	return response;
}

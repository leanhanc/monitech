"use server";
import { cookies } from "next/headers";

/* Utils */
import { API } from "apps/frontend/lib/utils";

export async function createInvoice({
	date,
	amount,
}: {
	date: string;
	amount: string;
}) {
	const token = await cookies().get("mst")?.value;
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

"use server";
import { cookies } from "next/headers";

/* Utils */
import { API } from "apps/frontend/lib/utils";
import { SESSION_TOKEN_NAME } from "apps/frontend/config";

/* Types */
import { Invoice } from "@monitech/types";

export async function createInvoice({
	date,
	amount,
	type,
	exchangeCurrency,
	foreignCurrencyAmount,
}: {
	date: Invoice["date"];
	amount: Invoice["amount"];
	type: Invoice["type"];
	exchangeCurrency?: Invoice["exchangeCurrency"];
	foreignCurrencyAmount?: Invoice["foreignCurrencyAmount"];
}) {
	const token = await cookies().get(SESSION_TOKEN_NAME)?.value;
	if (!token) return;

	const response = await API<{ id: number }>("/invoice", {
		method: "POST",
		body: JSON.stringify({
			date,
			amount,
			type,
			exchangeCurrency,
			foreignCurrencyAmount,
		}),
		token,
	});

	return response;
}

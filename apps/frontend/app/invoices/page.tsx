import { cookies } from "next/headers";

/* Utils */
import { API } from "apps/frontend/lib/utils";

/* Config */
import { SESSION_TOKEN_NAME } from "apps/frontend/config";

/* Views */
import InvoicesView from "@frontend/invoices/view";

/* Types */
import { Invoice } from "@monitech/types";

async function fetchInvoices() {
	"use server";
	const token = await cookies().get(SESSION_TOKEN_NAME)?.value;
	if (!token) return;

	const invoices = await API<Invoice[]>("/invoice", {
		token,
		cache: "force-cache",
		next: {
			tags: ["invoice", "list"],
		},
	});

	if (invoices.result === "success") {
		return invoices.data;
	}
}



export default async function InvoicesPage() {
	const invoices = await fetchInvoices();

	return <InvoicesView invoices={invoices} />;
}

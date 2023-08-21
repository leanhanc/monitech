import { cookies } from "next/headers";

/* Utils */
import { TransctionPeriodData } from "@frontend/dashboard/page";
import { API } from "apps/frontend/lib/utils";

/* Config */
import { SESSION_TOKEN_NAME } from "apps/frontend/config";

/* Views */
import InvoicesView from "@frontend/invoices/view";

async function fetchCurrentPeriodInvoices() {
	"use server";
	const token = await cookies().get(SESSION_TOKEN_NAME)?.value;
	if (!token) return;

	const invoices = await API<TransctionPeriodData>("/invoice/current", {
		token,
		cache: "force-cache",
		next: {
			tags: ["invoice", "current"],
		},
	});

	if (invoices.result === "success") {
		return invoices.data;
	}
}

export default async function InvoicesPage() {
	const currentPeriodInvoices = await fetchCurrentPeriodInvoices();

	return <InvoicesView currentPeriodInvoices={currentPeriodInvoices} />;
}

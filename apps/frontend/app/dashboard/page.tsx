import { cookies } from "next/headers";

/* Components */
import Container from "@frontend/components/Container";

/* Utils */
import { SESSION_TOKEN_NAME } from "apps/frontend/config";
import { API } from "apps/frontend/lib/utils";

/* Types */
import { Invoice } from "@monitech/types";

/* View */
import DashboardView from "@frontend/dashboard/view";
import { invoices } from "@monitech/db";

export type TransctionPeriodData = Record<string, Invoice[]>;

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

export default async function DashboardPage() {
	const currentPeriodInvoices = await fetchCurrentPeriodInvoices();

	return <DashboardView currentPeriodInvoices={currentPeriodInvoices} />;
}

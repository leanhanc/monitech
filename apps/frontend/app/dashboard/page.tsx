import { cookies } from "next/headers";

/* Components */
import Container from "@frontend/components/Container";

/* Utils */
import { SESSION_TOKEN_MAME } from "apps/frontend/config";
import { API } from "apps/frontend/lib/utils";

/* Types */
import { Invoice } from "@monitech/types";

/* View */
import DashboardView from "@frontend/dashboard/view";
import { invoices } from "@monitech/db";

export type TransctionPeriodData = Record<string, Invoice[]>;

async function fetchCurrentPeriodInvoices() {
	"use server";
	const token = await cookies().get(SESSION_TOKEN_MAME)?.value;
	if (!token) return;

	const invoices = await API<TransctionPeriodData>("/invoice/current", {
		token,
	});

	if (invoices.result === "success") {
		return invoices.data;
	}
}

export default async function Dashboard() {
	const currentPeriodInvoices = await fetchCurrentPeriodInvoices();

	return <DashboardView currentPeriodInvoices={currentPeriodInvoices} />;
}

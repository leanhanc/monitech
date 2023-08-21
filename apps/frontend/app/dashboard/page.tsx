import { cookies } from "next/headers";

/* Utils */
import { SESSION_TOKEN_NAME } from "apps/frontend/config";
import { API } from "apps/frontend/lib/utils";

/* View */
import DashboardView from "@frontend/dashboard/view";

export type SummaryData = Array<{ year: string; amount: string }>;

async function fetchCurrentPeriodSummary() {
	"use server";
	const token = await cookies().get(SESSION_TOKEN_NAME)?.value;
	if (!token) return;

	const invoices = await API<SummaryData>("/invoice/summary", {
		token,
		cache: "force-cache",
		next: {
			tags: ["invoice", "summary"],
		},
	});

	if (invoices.result === "success") {
		return invoices.data;
	}
}

export default async function DashboardPage() {
	const summary = await fetchCurrentPeriodSummary();

	return <DashboardView currentPeriodSummary={summary} />;
}

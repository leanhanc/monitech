import { invoices } from "@monitech/db";
import { InferModel } from "drizzle-orm";

export type Invoice = InferModel<typeof invoices>;

export interface LimitsReport {
	usd: number;
	ars: number;
	limit: number;
}
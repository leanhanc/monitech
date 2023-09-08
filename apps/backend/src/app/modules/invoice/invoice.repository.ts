import { and, eq, gt, sql } from "drizzle-orm";
import { InjectDrizzle } from "@backend/modules/drizzle";
import { sub } from "date-fns";

// DTOs
import { CreateInvoceDto } from "@backend/modules/invoice/dto";

// Types
import { Database } from "@monitech/types";
import { invoices } from "@monitech/db";

export class InvoiceRepository {
	constructor(@InjectDrizzle() private readonly db: Database) {}

	async selectInvoices(userId: number) {
		const selectResult = await this.db.query.invoices.findMany({
			where: eq(invoices.userId, userId),
		});

		return selectResult;
	}

	async selectGroupedTotalsByYear(userId: number) {
		const today = new Date();
		const aYearFromToday = sub(today, { days: 365 });

		const summary = await this.db
			.select({
				year: sql`EXTRACT(YEAR FROM date) as year`,
				amount: sql`SUM(amount)`,
			})
			.from(invoices)
			.where(
				and(
					eq(invoices.userId, userId),
					gt(invoices.date, aYearFromToday.toISOString()),
				),
			)
			.groupBy(sql`year`)
			.orderBy(sql`year`);

		return summary;
	}

	async selectInvoicesFromCurrentPeriod(userId: number) {
		const today = new Date();
		const aYearFromToday = sub(today, { days: 365 });

		const selectResult = await this.db
			.select({
				id: invoices.id,
				date: invoices.date,
				amount: invoices.amount,
				type: invoices.type,
				exchangeCurrency: invoices.exchangeCurrency,
				foreignCurrencyAmount: invoices.foreignCurrencyAmount,
			})
			.from(invoices)
			.where(
				and(
					eq(invoices.userId, userId),
					gt(invoices.date, aYearFromToday.toISOString()),
				),
			);

		return selectResult;
	}

	async insertInvoice(createInvoiceDto: CreateInvoceDto, userId: number) {
		const insertResult = await this.db
			.insert(invoices)
			.values({
				amount: createInvoiceDto.amount.toString(),
				date: createInvoiceDto.date,
				type: createInvoiceDto.type,
				exchangeCurrency: createInvoiceDto.exchangeCurrency,
				foreignCurrencyAmount: createInvoiceDto.foreignCurrencyAmount,
				userId,
			})
			.returning({ id: invoices.id });

		return insertResult.pop();
	}
}

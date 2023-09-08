import { Injectable } from "@nestjs/common";

/* DTO */
import { CreateInvoceDto } from "@backend/modules/invoice/dto";

/* Repository */
import { InvoiceRepository } from "@backend/modules/invoice/invoice.repository";

/* Utils */
import { groupInvoicesByYear } from "@backend/modules/invoice/invoice.utils";
import { LimitsReport } from "@monitech/types";

@Injectable()
export class InvoiceService {
	constructor(public invoiceRepository: InvoiceRepository) {}

	/* Read */
	async findInvoices(userId: number) {
		return this.invoiceRepository.selectInvoices(userId);
	}

	async buildSummary(userId: number) {
		const summary = await this.invoiceRepository.selectGroupedTotalsByYear(
			userId,
		);

		return summary;
	}

	async findInvoicesFromCurrentPeriod(userId: number) {
		const lastYearInvoices =
			await this.invoiceRepository.selectInvoicesFromCurrentPeriod(userId);
		const lastYearInvoicesGroupedByYear = groupInvoicesByYear(lastYearInvoices);

		return lastYearInvoicesGroupedByYear;
	}

	async buildLimitsReport(userId: number): Promise<LimitsReport> {
		const thisPeriodInvoices = await this.findInvoicesFromCurrentPeriod(userId);
		const currentCategoryHLimit = process.env.CATEGORY_H_LIMIT;

		let totalDolarsEnteredThisYear = 0;
		let totalPesosBilledThisPeriod = 0;

		Object.values(thisPeriodInvoices).forEach((invoices) => {
			invoices.forEach((invoice) => {
				totalPesosBilledThisPeriod =
					totalPesosBilledThisPeriod + parseFloat(invoice.amount || "0");

				if (invoice.exchangeCurrency === "USD") {
					totalDolarsEnteredThisYear =
						totalDolarsEnteredThisYear +
						parseFloat(invoice.foreignCurrencyAmount || "0");
				}
			});
		});

		return {
			usd: totalDolarsEnteredThisYear,
			ars: totalPesosBilledThisPeriod,
			limit: parseFloat(currentCategoryHLimit || "0"),
		};
	}

	/* Create */
	async createInvoce(createInvoiceDto: CreateInvoceDto, userId: number) {
		return this.invoiceRepository.insertInvoice(createInvoiceDto, userId);
	}
}

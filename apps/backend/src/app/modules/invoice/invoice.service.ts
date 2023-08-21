import { Injectable } from "@nestjs/common";

/* DTO */
import { CreateInvoceDto } from "@backend/modules/invoice/dto";

/* Repository */
import { InvoiceRepository } from "@backend/modules/invoice/invoice.repository";

/* Utils */
import { groupInvoicesByYear } from "@backend/modules/invoice/invoice.utils";

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

	async buildLimitsReport(userId: number) {
		const thisPeriodInvoices = await this.findInvoicesFromCurrentPeriod(userId);
		const currentCategoryHLimit = process.env.CATEGORY_H_LIMIT;

		let totalDolarsEnteredThisYear = 0;

		Object.values(thisPeriodInvoices).forEach((invoices) => {
			invoices.forEach((invoices) => {
				if (invoices.currency === "USD") {
					totalDolarsEnteredThisYear =
						totalDolarsEnteredThisYear + parseFloat(invoices.amount);
				}
			});
		});

		return {
			current: totalDolarsEnteredThisYear,
			limit: parseFloat(currentCategoryHLimit || "0"),
		};
	}

	/* Create */
	async createInvoce(createInvoiceDto: CreateInvoceDto, userId: number) {
		return this.invoiceRepository.insertInvoice(createInvoiceDto, userId);

		return true;
	}
}

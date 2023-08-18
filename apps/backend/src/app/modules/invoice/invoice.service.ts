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

	async findInvoicesFromCurrentPeriod(userId: number) {
		const lastYearInvoices =
			await this.invoiceRepository.selectInvoicesFromCurrentPeriod(userId);
		const lastYearInvoicesGroupedByYear = groupInvoicesByYear(lastYearInvoices);

		return lastYearInvoicesGroupedByYear;
	}

	/* Create */
	async createInvoce(createInvoiceDto: CreateInvoceDto, userId: number) {
		return this.invoiceRepository.insertInvoice(createInvoiceDto, userId);

		return true;
	}
}

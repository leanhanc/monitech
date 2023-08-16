import { Injectable } from "@nestjs/common";

/* DTO */
import { CreateInvoceDto } from "@backend/modules/invoice/dto";

/* Repository */

import { InvoiceRepository } from "@backend/modules/invoice/invoice.repository";
@Injectable()
export class InvoiceService {
	constructor(public invoiceRepository: InvoiceRepository) {}

	/* Read */
	async findInvoices(userId: number) {
		return this.invoiceRepository.selectInvoices(userId);
	}

	/* Create */
	async createInvoce(createInvoiceDto: CreateInvoceDto, userId: number) {
		return this.invoiceRepository.insertInvoice(createInvoiceDto, userId);

		return true;
	}
}

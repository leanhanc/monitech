import { Injectable } from "@nestjs/common";

/* DTO */
import { CreateInvoceDto } from "@backend/modules/invoice/dto";

/* Repository */

import { InvoiceRepository } from "@backend/modules/invoice/invoice.repository";
@Injectable()
export class InvoiceService {
	constructor(public invoiceRepository: InvoiceRepository) {}

	/* Create */
	async createInvoce(createInvoiceDto: CreateInvoceDto) {
		return this.invoiceRepository.insertInvoice(createInvoiceDto);

		return true;
	}
}

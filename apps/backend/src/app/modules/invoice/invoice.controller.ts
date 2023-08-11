import { Body, Controller, Post } from "@nestjs/common";

// DTOs
import { CreateInvoceDto } from "@backend/modules/invoice/dto/createInvoice.dto";

// Services
import { InvoiceService } from "@backend/modules/invoice/invoice.service";

@Controller({ path: "invoice", version: "1" })
export class InvoiceController {
	constructor(public invoiceService: InvoiceService) {}

	@Post()
	public async postInvoice(@Body() createInvoiceDto: CreateInvoceDto) {
		return this.invoiceService.createInvoce(createInvoiceDto);
	}
}

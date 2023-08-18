import { Body, Controller, Get, Post } from "@nestjs/common";

// DTOs
import { CreateInvoceDto } from "@backend/modules/invoice/dto/createInvoice.dto";

// Services
import { InvoiceService } from "@backend/modules/invoice/invoice.service";
// Types
import { UserJwtPayload } from "@backend/modules/user/user.types";

// Decorators
import { GetUser } from "@backend/modules/user/user.decorator";

@Controller({ path: "invoice", version: "1" })
export class InvoiceController {
	constructor(public invoiceService: InvoiceService) {}

	@Get()
	public async getInvoices(@GetUser() user: UserJwtPayload) {
		return this.invoiceService.findInvoices(user.id);
	}

	@Get("/current")
	public async getInvoicesFromCurrentPeriod(@GetUser() user: UserJwtPayload) {
		return this.invoiceService.findInvoicesFromCurrentPeriod(user.id);
	}

	@Post()
	public async postInvoice(
		@Body() createInvoiceDto: CreateInvoceDto,
		@GetUser() user: UserJwtPayload,
	) {
		return this.invoiceService.createInvoce(createInvoiceDto, user.id);
	}
}

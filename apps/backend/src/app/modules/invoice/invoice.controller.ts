import { Body, Controller, Post, UseGuards } from "@nestjs/common";

// DTOs
import { CreateInvoceDto } from "@backend/modules/invoice/dto/createInvoice.dto";

// Services
import { InvoiceService } from "@backend/modules/invoice/invoice.service";

// Guards
import { AuthGuard } from "@backend/modules/auth/auth.guard";

// Types
import { UserJwtPayload } from "@backend/modules/user/user.types";

// Decorators
import { GetUser } from "@backend/modules/user/user.decorator";

@Controller({ path: "invoice", version: "1" })
export class InvoiceController {
	constructor(public invoiceService: InvoiceService) {}

	@UseGuards(AuthGuard)
	@Post()
	public async postInvoice(
		@Body() createInvoiceDto: CreateInvoceDto,
		@GetUser() user: UserJwtPayload,
	) {
		return this.invoiceService.createInvoce(createInvoiceDto, user.id);
	}
}

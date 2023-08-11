import { Module } from "@nestjs/common";

/* Layers */
import { InvoiceController } from "@backend/modules/invoice/invoice.controller";
import { InvoiceService } from "@backend/modules/invoice/invoice.service";
import { InvoiceRepository } from "@backend/modules/invoice/invoice.repository";

@Module({
	imports: [],
	controllers: [InvoiceController],
	providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}

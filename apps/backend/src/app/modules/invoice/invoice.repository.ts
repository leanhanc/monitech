import { InjectDrizzle } from "@backend/modules/drizzle";

// DTOs
import { CreateInvoceDto } from "@backend/modules/invoice/dto";

// Types
import { Database } from "@monitech/types";
import { invoices } from "@monitech/db";

export class InvoiceRepository {
	constructor(@InjectDrizzle() private readonly db: Database) {}

	async insertInvoice(createInvoiceDto: CreateInvoceDto, userId: number) {
		const insertResult = await this.db
			.insert(invoices)
			.values({
				amount: createInvoiceDto.amount.toString(),
				date: createInvoiceDto.date,
				userId,
			})
			.returning({ id: invoices.id });

		return insertResult.pop();
	}
}

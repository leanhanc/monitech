import { IsDateString, IsDecimal, IsEnum } from "class-validator";

enum Currency {
	ARS,
	USD,
}

export class CreateInvoceDto {
	@IsDecimal({ decimal_digits: "2" })
	amount: string;

	@IsDateString()
	date: string;

	@IsEnum(Currency)
	currency: "ARS" | "USD";
}

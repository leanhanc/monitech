import { IsDateString, IsDecimal, IsEnum, IsOptional } from "class-validator";

enum Currency {
	ARS,
	USD,
}

enum Type {
	C,
	E,
}

export class CreateInvoceDto {
	@IsDecimal({ decimal_digits: "2" })
	amount: string;

	@IsDateString()
	date: string;

	@IsEnum(Type)
	type: "C" | "E";

	@IsOptional()
	@IsEnum(Currency)
	exchangeCurrency: "ARS" | "USD";

	@IsOptional()
	@IsDecimal({ decimal_digits: "2" })
	foreignCurrencyAmount: "ARS" | "USD";
}

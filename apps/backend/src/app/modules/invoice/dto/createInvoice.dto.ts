import { IsDateString, IsDecimal } from "class-validator";

export class CreateInvoceDto {
	@IsDecimal({ decimal_digits: "2" })
	amount: string;

	@IsDateString()
	date: string;
}

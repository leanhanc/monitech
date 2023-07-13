import { IsString, IsEmail, MinLength, Length } from "class-validator";

export class LocalLoginDto {
	@IsEmail()
	@Length(1, 32)
	email: string;

	@IsString()
	@MinLength(6)
	password: string;
}

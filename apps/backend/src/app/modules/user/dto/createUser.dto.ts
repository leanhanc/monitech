import { IsString, IsEmail, MinLength, Length } from "class-validator";

export class CreateUserDto {
	@IsString()
	@Length(1, 32)
	name: string;

	@IsEmail()
	@Length(1, 32)
	email: string;

	@IsString()
	@MinLength(6)
	password: string;
}

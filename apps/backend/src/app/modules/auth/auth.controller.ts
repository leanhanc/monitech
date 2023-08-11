import { Body, Controller, Post } from "@nestjs/common";

// DTOs
import { LocalRegisterDto } from "@backend/modules/auth/dto/local.register.dto";
import { LocalLoginDto } from "@backend/modules/auth/dto";

// Services
import { AuthService } from "@backend/modules/auth/auth.service";

@Controller({ path: "auth", version: "1" })
export class AuthController {
	constructor(public authService: AuthService) {}

	@Post("local/register")
	public async postRegister(@Body() localRegisterDto: LocalRegisterDto) {
		return this.authService.localRegister(localRegisterDto);
	}

	@Post("local/login")
	public async postLogin(@Body() localLogin: LocalLoginDto) {
		return this.authService.localLogin(localLogin);
	}
}

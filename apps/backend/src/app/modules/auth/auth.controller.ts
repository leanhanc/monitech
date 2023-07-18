import { Body, Controller, Post } from "@nestjs/common";

// DTOs
import { LocalRegisterDto } from "@backend/modules/auth/dto/local.register.dto";

// Services
import { AuthService } from "@backend/modules/auth/auth.service";

@Controller({ path: "auth", version: "1" })
export class AuthController {
	constructor(public authService: AuthService) {}

	@Post("local")
	public async postRegister(@Body() localRegisterDto: any) {
		console.log({ localRegisterDto });
		return this.authService.localRegister(localRegisterDto);
	}
}

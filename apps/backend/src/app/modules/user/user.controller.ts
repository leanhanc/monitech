import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "@backend/modules/user/user.service";
import { CreateUserDto } from "@backend/modules/user/dto/createUser.dto";

@Controller({ path: "users", version: "1" })
export class UserController {
	constructor(public userService: UserService) {}

	@Post("/")
	async postUser(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
	}
}

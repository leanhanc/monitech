import { Controller } from "@nestjs/common";
import { UserService } from "@backend/modules/user/user.service";

@Controller({ path: "users", version: "1" })
export class UserController {
	constructor(public userService: UserService) {}
}

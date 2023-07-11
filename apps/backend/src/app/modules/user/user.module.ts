import { Module } from "@nestjs/common";

// Layers
import { UserController } from "@backend/modules/user/user.controller";
import { UserService } from "@backend/modules/user/user.service";
import { UserRepository } from "@backend/modules/user/user.repository";

@Module({
	imports: [],
	providers: [UserService, UserRepository],
	controllers: [UserController],
	exports: [UserService, UserRepository],
})
export class UserModule {}

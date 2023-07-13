import { Module } from "@nestjs/common";

// Layers
import { UserController } from "@backend/modules/user/user.controller";
import { UserService } from "@backend/modules/user/user.service";
import { UserRepository } from "@backend/modules/user/user.repository";

// Imports
import { EncryptionModule } from "@backend/modules/encryption/encryption.module";

@Module({
	imports: [EncryptionModule],
	providers: [UserService, UserRepository],
	controllers: [UserController],
	exports: [UserService, UserRepository],
})
export class UserModule {}

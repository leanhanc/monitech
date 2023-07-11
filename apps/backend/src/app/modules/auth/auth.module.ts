import { Module } from "@nestjs/common";

// Layers
import { AuthController } from "@backend/modules/auth/auth.controller";
import { AuthService } from "./auth.service";

// Imports
import { UserModule } from "@backend/modules/user/user.module";
import { EncryptionModule } from "@backend/modules/encryption/encryption.module";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [UserModule, EncryptionModule],
})
export class AuthModule {}

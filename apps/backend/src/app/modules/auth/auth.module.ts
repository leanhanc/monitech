import { Module } from "@nestjs/common";

// Layers
import { AuthController } from "@backend/modules/auth/auth.controller";
import { AuthService } from "./auth.service";

// Imports
import { UserModule } from "@backend/modules/user/user.module";
import { EncryptionModule } from "@backend/modules/encryption/encryption.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
		}),
		UserModule,
		EncryptionModule,
	],
	exports: [],
})
export class AuthModule {}

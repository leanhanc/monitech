import { Module } from "@nestjs/common";

/* Layers */
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

/* Modules */
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { JwtModule } from "@nestjs/jwt";

import { DrizzleModule } from "@backend/modules/drizzle/drizzle.module";
import { EncryptionModule } from "@backend/modules/encryption/encryption.module";

import { AuthModule } from "@backend/modules/auth/auth.module";
import { UserModule } from "@backend/modules/user/user.module";
import { InvoiceModule } from "@backend/modules/invoice/invoice.module";

/* Guards */
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@backend/modules/auth/auth.guard";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 50,
		}),
		JwtModule.register({ secret: process.env.JWT_SECRET }),
		DrizzleModule,
		EncryptionModule,
		AuthModule,
		UserModule,
		InvoiceModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}

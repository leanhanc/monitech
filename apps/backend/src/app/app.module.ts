import { Module } from "@nestjs/common";

/* Layers */
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

/* Modules */
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { DrizzleModule } from "@backend/modules/drizzle/drizzle.module";
import { EncryptionModule } from "@backend/modules/encryption/encryption.module";

/* Guards */
import { APP_GUARD } from "@nestjs/core";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 50,
		}),
		DrizzleModule,
		EncryptionModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}

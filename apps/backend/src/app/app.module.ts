import { Module } from "@nestjs/common";

/* Layers */
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

/* Modules */
import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "@backend/modules/drizzle/drizzle.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DrizzleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

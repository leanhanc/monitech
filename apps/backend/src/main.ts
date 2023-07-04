import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	/* App config */
	const port = process.env.PORT || 5555;

	/* API config */
	const globalPrefix = "api";
	app.setGlobalPrefix(globalPrefix);

	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
	);
}

bootstrap();

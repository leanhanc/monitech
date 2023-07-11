import { Controller, Get, Query } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller({ path: "global", version: "1" })
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/hello")
	getData(@Query("message") message: string) {
		return this.appService.getData(message);
	}
}

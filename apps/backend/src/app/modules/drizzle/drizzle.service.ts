import { Cron, CronExpression } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";


/* Constants */
import { InjectDrizzle } from "./drizzle.constants";

/* Types */
import { Database } from "@monitech/types";


@Injectable()
export class DrizzleService {
	constructor(@InjectDrizzle() private readonly db: Database) {}

	@Cron(CronExpression.EVERY_5_MINUTES)
	async reconnectDb() {
		console.log("Keeping connection warm...");
		/* This is just a select to keep the connection going */
		return await this.db.query.users.findFirst({
			with: {
				invoices: true,
			},
		});
	}
}

import { Cron, CronExpression } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

/* Constants */
import { InjectDrizzle } from "./drizzle.constants";

/* Types */
import { Database } from "@monitech/types";

/* Users */
import { users } from "@monitech/db";

@Injectable()
export class DrizzleService {
	constructor(@InjectDrizzle() private readonly db: Database) {}

	@Cron(CronExpression.EVERY_5_MINUTES)
	async reconnectDb() {
		console.log("Keeping connection warm...");
		/* This is just a select to keep the connection going */
		await this.db.select({ id: users.id }).from(users).where(eq(users.id, 1));
	}
}

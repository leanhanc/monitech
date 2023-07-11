import { Injectable } from "@nestjs/common";

/* Constants */
import { InjectDrizzle } from "./drizzle.constants";

/* Types */
import { Database } from "@monodev/types";

@Injectable()
export class DrizzleService {
	constructor(@InjectDrizzle() private readonly db: Database) {}
}

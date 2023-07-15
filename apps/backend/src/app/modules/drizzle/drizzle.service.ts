import { Injectable } from "@nestjs/common";

/* Constants */
import { InjectDrizzle } from "./drizzle.constants";

/* Types */
import { Database } from "@monitech/types";

@Injectable()
export class DrizzleService {
	constructor(@InjectDrizzle() private readonly db: Database) {}
}

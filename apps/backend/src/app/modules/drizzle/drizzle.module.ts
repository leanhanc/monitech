import { Client } from "pg";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";

/* Models */
import * as schema from "./schema";

/* Constants */
import {
	getDrizzleConfigToken,
	getDrizzleInstanceToken,
} from "./drizzle.constants";
import { Database, DrizzleConfig } from "./drizzle.types";

/* Layers */
import { DrizzleService } from "./drizzle.service";

@Global()
@Module({
	imports: [],
	providers: [
		DrizzleService,
		{
			provide: getDrizzleConfigToken(),
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => {
				const getDatabaseConfig = async (): Promise<DrizzleConfig> => {
					return {
						host: config.get<string>("PGHOST") || "",
						database: config.get<string>("PGDATABASE") || "",
						user: config.get<string>("PGUSER") || "",
						password: config.get<string>("PGPASSWORD") || "",
					};
				};

				return await getDatabaseConfig();
			},
		},
		{
			provide: getDrizzleInstanceToken(),
			inject: [getDrizzleConfigToken()],
			useFactory: async ({
				database,
				host,
				password,
				user,
			}: DrizzleConfig): Promise<Database> => {
				const connectionString = `postgres://${user}:${password}@${host}/${database}`;

				const client = new Client({
					connectionString,
					ssl: true,
				});

				await client.connect();

				const db = drizzle(client, { logger: true, schema });

				return db;
			},
		},
	],
	exports: [getDrizzleInstanceToken()],
})
export class DrizzleModule {}

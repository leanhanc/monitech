import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { ssl: true });
const db = drizzle(sql);

async function runMigrations() {
	await migrate(db, { migrationsFolder: "packages/db/src/migrations" });
}

runMigrations().then((result) => {
	console.log(result);
	process.exit(0);
});

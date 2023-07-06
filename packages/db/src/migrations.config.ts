import type { Config } from "drizzle-kit";

export default {
	schema: "./packages/db/src/index.ts",
	out: "./packages/db/src/migrations",
} satisfies Config;

import {
	pgTable,
	timestamp,
	uniqueIndex,
	varchar,
	serial,
} from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: serial("id").primaryKey(),
		username: varchar("username", { length: 32 }).notNull(),
		email: varchar("email", { length: 60 }).notNull(),
		password: varchar("password", { length: 255 }).notNull(),
		createdAt: timestamp("createdAt").notNull().defaultNow(),
		updatedAt: timestamp("updatedAt").notNull().defaultNow(),
	},
	(table) => {
		return {
			usernameIndex: uniqueIndex("usernameIndex").on(table.username),
			emailIndex: uniqueIndex("emailIndex").on(table.email),
		};
	},
);

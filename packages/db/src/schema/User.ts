import {
	pgTable,
	timestamp,
	uniqueIndex,
	varchar,
	serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* Relations */
import { invoices } from "./Invoice";

export const users = pgTable(
	"users",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		email: varchar("email", { length: 255 }).notNull(),
		password: varchar("password", { length: 255 }).notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			emailIndex: uniqueIndex("user_email_index").on(table.email),
		};
	},
);

export const usersRelations = relations(users, ({ many }) => ({
	invoices: many(invoices),
}));

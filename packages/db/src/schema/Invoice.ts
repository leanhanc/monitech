import {
	pgTable,
	timestamp,
	serial,
	date,
	decimal,
	integer,
	index,
	pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* Relations */
import { users } from "./User";

/* Enums */
export const moodEnum = pgEnum("currency", ["ARS", "USD"]);

export const invoices = pgTable(
	"invoices",
	{
		id: serial("id").primaryKey(),
		userId: integer("user_id").references(() => users.id),
		date: date("date").notNull(),
		amount: decimal("amount").notNull(),
		currency: moodEnum("currency").default("ARS"),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			dateIndex: index("invoice_date_index").on(table.date),
		};
	},
);

export const invoicesRelations = relations(invoices, ({ one }) => ({
	user: one(users, {
		fields: [invoices.userId],
		references: [users.id],
	}),
}));

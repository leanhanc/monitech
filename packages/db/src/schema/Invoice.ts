import {
	pgTable,
	timestamp,
	serial,
	date,
	decimal,
	integer,
	index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* Relations */
import { users } from "./User";

export const invoices = pgTable(
	"invoices",
	{
		id: serial("id").primaryKey(),
		userId: integer("user_id").notNull(),
		date: date("date").notNull(),
		amount: decimal("amount").notNull(),
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

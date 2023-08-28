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
export const typeEnum = pgEnum("type", ["C", "E"]);
export const currencyEnum = pgEnum("currency", ["ARS", "USD"]);

export const invoices = pgTable(
	"invoices",
	{
		id: serial("id").primaryKey(),
		userId: integer("user_id").references(() => users.id),
		date: date("date").notNull(),
		type: typeEnum("type").notNull().default("C"),
		amount: decimal("amount").notNull(),
		foreignCurrencyAmount: decimal("foreign_currency_amount"),
		exchangeCurrency: currencyEnum("exchange_currency"),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			dateIndex: index("invoice_date_index").on(table.date),
			typeIndex: index("invoice_type_index").on(table.type),
			exchangeCurrencyIndex: index("invoice_exchange_currency_index").on(
				table.exchangeCurrency,
			),
		};
	},
);

export const invoicesRelations = relations(invoices, ({ one }) => ({
	user: one(users, {
		fields: [invoices.userId],
		references: [users.id],
	}),
}));

import { text, integer, pgTable, uuid, unique } from "drizzle-orm/pg-core";

export const aprsTable = pgTable("apr_rates", {
  id: uuid("id").defaultRandom().primaryKey(),
  apr: text("feedback").notNull(),
  timestamp: integer("timestamp").notNull(),
});

export const lastMonthApr = pgTable(
  "last_month_apr",
  {
    id: integer("id").primaryKey().default(1), // Always ID 1
    apr: text("apr").notNull(),
    latestTimestamp: integer("timestamp").notNull(),
  },
  (table) => [
    unique().on(table.id), // Ensures only one row
  ],
);
export type InsertAprs = typeof aprsTable.$inferInsert;
export type SelectAprs = typeof aprsTable.$inferSelect;
export type InsertLastMonthApr = typeof lastMonthApr.$inferInsert;
export type SelectLastMonthApr = typeof lastMonthApr.$inferSelect;

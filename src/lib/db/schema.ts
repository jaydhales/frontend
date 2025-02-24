import { text, integer, pgTable, serial, unique } from "drizzle-orm/pg-core";

export const payoutTable = pgTable("payouts", {
  id: serial("id_").primaryKey(),
  sirInUSD: text("sir_in_usd").notNull(),
  ethInUSD: text("eth_in_usd").notNull(),
  timestamp: integer("timestamp").notNull(),
});

export const currentApr = pgTable(
  "current_apr",
  {
    id: integer("id").primaryKey().default(1), // Always ID 1
    apr: text("apr").notNull(),
    latestTimestamp: integer("timestamp").notNull(),
  },
  (table) => [
    unique().on(table.id), // Ensures only one row
  ],
);
export type InsertPayout = typeof payoutTable.$inferInsert;
export type SelectPayout = typeof payoutTable.$inferSelect;
export type InsertCurrentApr = typeof currentApr.$inferInsert;
export type SelectCurrentApr = typeof currentApr.$inferSelect;

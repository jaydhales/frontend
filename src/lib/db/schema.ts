import { text, integer, pgTable, serial, unique } from "drizzle-orm/pg-core";

export const aprsTable = pgTable("apr_rates", {
  id: serial("id").primaryKey(),
  apr: text("apr").notNull(),
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
export type InsertAprs = typeof aprsTable.$inferInsert;
export type SelectAprs = typeof aprsTable.$inferSelect;
export type InsertCurrentApr = typeof currentApr.$inferInsert;
export type SelectCurrentApr = typeof currentApr.$inferSelect;

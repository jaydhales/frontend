import { text, integer, pgTable, uuid } from "drizzle-orm/pg-core";

export const aprsTable = pgTable("apr_rates", {
  id: uuid("id").defaultRandom().primaryKey(),
  apr: text("feedback").notNull(),
  timestamp: integer("timestamp").notNull(),
});

export type InsertAprs = typeof aprsTable.$inferInsert;
export type SelectAprs = typeof aprsTable.$inferSelect;

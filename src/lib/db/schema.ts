import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const feedbackTable = sqliteTable("feedback", {
  id: integer("id").primaryKey(),
  feedback: text("feedback").notNull(),
});

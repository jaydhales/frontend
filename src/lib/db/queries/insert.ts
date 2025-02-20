import { db } from "../db";
import type { InsertAprs, InsertLastMonthApr } from "../schema";
import { aprsTable, lastMonthApr } from "../schema";

export async function insertApr(data: InsertAprs) {
  try {
    const query = await db.insert(aprsTable).values(data);
    return query;
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
export async function insertOrUpdateAprAggregate(data: InsertLastMonthApr) {
  const query = await db
    .insert(lastMonthApr)
    .values(data)
    .onConflictDoUpdate({ target: lastMonthApr.id, set: data });
  return query;
}

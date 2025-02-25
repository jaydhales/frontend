import { db } from "../db";
import type { InsertCurrentApr, InsertPayout } from "../schema";
import { currentApr, payoutTable } from "../schema";

export async function insertPayout(data: InsertPayout) {
  try {
    const query = await db.insert(payoutTable).values(data);
    return query;
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
export async function insertOrUpdateCurrentApr(data: InsertCurrentApr) {
  const query = await db
    .insert(currentApr)
    .values(data)
    .onConflictDoUpdate({ target: currentApr.id, set: data });
  return query;
}
export async function deletePayouts() {
  const query = await db.delete(payoutTable);
  return query;
}
export async function deleteCurrentApr() {
  const query = await db.delete(currentApr);
  return query;
}

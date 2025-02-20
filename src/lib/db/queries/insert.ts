import { db } from "../db";
import type { InsertAprs } from "../schema";
import { aprsTable } from "../schema";

export async function createApr(data: InsertAprs) {
  try {
    const query = await db.insert(aprsTable).values(data);
    return query;
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

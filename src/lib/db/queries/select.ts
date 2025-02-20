import { db } from "../db";
import { aprsTable } from "../schema";

export async function getAprs() {
  const apr = await db.select().from(aprsTable);
  return apr;
}

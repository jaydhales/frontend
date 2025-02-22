import { db } from "../db";
import { aprsTable } from "../schema";

export async function selectAprs() {
  const apr = await db.select().from(aprsTable);
  return apr;
}
export async function selectLastMonthApr() {
  const lastMonthApr = await db.select().from(aprsTable);
  return lastMonthApr;
}

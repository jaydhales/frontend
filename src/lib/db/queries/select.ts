import { desc, gt } from "drizzle-orm";
import { db } from "../db";
import { currentApr, payoutTable } from "../schema";

export async function selectPayouts() {
  const apr = await db.select().from(payoutTable);
  return apr;
}
export async function selectLastMonthPayouts() {
  const now = Math.floor(Date.now() / 1000);
  console.log({ now });
  const payouts = await db
    .select()
    .from(payoutTable)
    .where(gt(payoutTable.timestamp, now - 30 * 24 * 60 * 60));
  return payouts;
}
export async function selectLastPayout() {
  const apr = await db
    .select()
    .from(payoutTable)
    .orderBy(desc(payoutTable.timestamp))
    .limit(1);
  return apr;
}
export async function selectCurrentApr() {
  try {
    const result = await db.select().from(currentApr);
    return result[0];
  } catch (e) {
    console.error(e);
    return { id: 0, apr: "0", latestTimestamp: 0 };
  }
}

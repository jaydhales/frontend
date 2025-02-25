import { createTRPCRouter, publicProcedure } from "../trpc";
import { executeGetLastestDividendsPaid } from "@/server/queries/dividendsPaid";
import { selectCurrentApr, selectLastPayout } from "@/lib/db/queries/select";
//sleep function
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const dividendsRouter = createTRPCRouter({
  longPollDividends: publicProcedure.query(async () => {
    const event = await executeGetLastestDividendsPaid();
    let tries = 0;
    while (true) {
      tries++;
      await sleep(1000);
      const lastPayout = await selectLastPayout();
      lastPayout[0]?.timestamp;
      if (lastPayout[0]?.timestamp === event[0]?.timestamp) {
        return true;
      }
      if (tries > 10) {
        return false;
      }
    }
  }),
  getApr: publicProcedure.query(async () => {
    const result = await selectCurrentApr();
    return result;
  }),
});

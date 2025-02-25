import { createTRPCRouter, publicProcedure } from "../trpc";
import { executeGetLastestDividendsPaid } from "@/server/queries/dividendsPaid";
import { selectCurrentApr } from "@/lib/db/queries/select";
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
      const lastPayout = await selectCurrentApr();
      console.log(lastPayout?.latestTimestamp, event[0]?.timestamp);

      if (
        lastPayout?.latestTimestamp === parseInt(event[0]?.timestamp ?? "0")
      ) {
        return true;
      }
      if (tries > 10) {
        return false;
      }
    }
  }),
  getApr: publicProcedure.query(async () => {
    const result = await selectCurrentApr();
    console.log(result, "RESULT");
    return result;
  }),
});

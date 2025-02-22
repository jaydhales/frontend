import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const handler = async (req: NextRequest) => {
  // get latest timestamp in last apr entry
  // get greaterThanDividendsPaid events
  // for (each event > latest timestamp) { historical eth price, calculate APR, store in Database }
  // calculate lastMonthApr
  try {
    for (let i = 0; i < 10; i++) {
      console.log("sleeping brotha");
      await sleep(1000);
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export { handler as GET };

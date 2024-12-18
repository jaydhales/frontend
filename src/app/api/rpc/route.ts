import { env } from "@/env";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import z from "zod";
const EthCallParamsSchema = z.object({
  data: z.string(),
  from: z.string(),
  to: z.string(),
  value: z.string(),
});

const EthCallSchema = z.object({
  jsonrpc: z.literal("2.0"),
  id: z.number(),
  method: z.literal("eth_call"),
  params: z.tuple([EthCallParamsSchema, z.literal("latest")]),
});
const handler = async (req: NextRequest) => {
  const j = (await req.json()) as unknown;
  const call = EthCallSchema.safeParse(j);
  if (call.success) {
    // ensure only our contracts get called
    for (const param of call.data.params) {
      if (param !== "latest") {
        if (
          param.to !== env.NEXT_PUBLIC_SIR_ADDRESS &&
          param.to !== env.NEXT_PUBLIC_VAULT_ADDRESS
        ) {
          return NextResponse.json({ success: false }, { status: 429 });
        }
      }
    }
    const rpcCall: unknown = await fetch(env.RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: call.success ? JSON.stringify(call.data) : JSON.stringify({}),
    }).then((r) => r.json());
    return NextResponse.json(rpcCall);
  } else {
    return NextResponse.json({ success: false }, { status: 429 });
  }
};

export { handler as GET, handler as POST };

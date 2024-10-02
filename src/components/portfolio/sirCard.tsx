import { api } from "@/trpc/react";
import { useAccount } from "wagmi";

import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SirCard() {
  const { isConnected, address } = useAccount();
  const { data: totalBalance } = api.user.getTotalSirBalance.useQuery(
    {
      user: address,
    },
    { enabled: isConnected },
  );

  return (
    <div className=" border-b border-secondary-200 pb-2">
      <div className=" px-2 pb-2 rounded-md text-2xl">
        <div className="flex justify-between pb-2">
          <h2 className="text-sm text-gray-200">Total SIR</h2>
          <Link
            href="/stake"
            className="flex text-blue-400 text-sm  items-center gap-x-1"
          >
            <span className="underline  underline-offset-2">Stake</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-3xl flex justify-between   ">
            <div className="flex gap-x-1 items-end">
              <span>{formatNumber(formatUnits(totalBalance ?? 0n, 12))}</span>
              <h2 className="text-gray-400 text-sm font-light">SIR</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

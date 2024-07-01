import { Button } from "@/components/ui/button";
import { getLeverageRatio } from "@/lib/utils";
import { api } from "@/trpc/react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
interface Props {
  apeAddress: string;
  colToken: string;
  colSymbol: string;
  debtToken: string;
  debtSymbol: string;
  leverageTier: string;
  setSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function BurnTableRow({
  apeAddress,
  setSelectedRow,
  debtSymbol,
  colSymbol,
  leverageTier,
}: Props) {
  const { address } = useAccount();

  const { data } = api.user.getApeBalance.useQuery(
    {
      address: apeAddress,
      user: address,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      // enabled: false,
    },
  );

  return (
    <tr className="grid grid-cols-5 items-center text-left text-gray text-white">
      <th>{apeAddress.slice(0, 5) + "..." + apeAddress.slice(-4)}</th>
      <th>{debtSymbol}</th>
      <th>{colSymbol}</th>
      <th>{getLeverageRatio(parseInt(leverageTier))}x</th>
      <th>
        <div className="flex items-center justify-between">
          <span>
            {parseFloat(parseFloat(formatUnits(data ?? 0n, 18)).toFixed(4))}
          </span>
          <Button
            onClick={() => setSelectedRow(apeAddress)}
            type="button"
            variant="outline"
          >
            Burn
          </Button>
        </div>
      </th>
    </tr>
  );
}

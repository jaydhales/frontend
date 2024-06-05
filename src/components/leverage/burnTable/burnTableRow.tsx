import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export default function BurnTableRow({
  tokenId,
  setSelectedRow,
}: {
  tokenId: string;
  setSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { address } = useAccount();
  const { data } = api.user.getApeBalance.useQuery({
    address: tokenId,
    user: address,
  });
  return (
    <tr className="grid grid-cols-6 items-center text-left text-gray text-white">
      <th>{tokenId.slice(0, 5) + "..." + tokenId.slice(-4)}</th>
      <th>200</th>
      <th>0x</th>
      <th>0x1</th>
      <th>1.4x</th>
      <th>
        <div className="flex items-center justify-between">
          <span>
            {parseFloat(parseFloat(formatUnits(data ?? 0n, 18)).toFixed(4))}
          </span>
          <Button
            onClick={() => setSelectedRow(tokenId)}
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

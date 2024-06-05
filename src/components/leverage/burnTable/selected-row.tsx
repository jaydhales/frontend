import { X } from "lucide-react";
import BurnTableHeaders from "./burnTableHeader";
import BurnForm from "../burnForm/burnForm";
import { TAddressString, TBurnRow } from "@/lib/types";
import { useAccount } from "wagmi";
import { api } from "@/trpc/react";
import { formatUnits } from "viem";
import { formatBigInt } from "@/lib/utils";

export default function SelectedRow({
  params,
  close,
  apeAddress,
}: {
  params: TBurnRow | undefined;
  apeAddress: TAddressString;
  close: () => void;
}) {
  const { address } = useAccount();
  const { data } = api.user.getApeBalance.useQuery({
    address: apeAddress,
    user: address,
  });
  if (!params) {
    <div>
      <h1>Hello</h1>
    </div>;
  }
  return (
    <div>
      <div className="flex flex-col gap-y-4 border-b-2 pb-8">
        <button
          type="button"
          onClick={() => close()}
          className="absolute -right-4 -top-12 cursor-pointer text-white/80 transition-transform hover:scale-105 hover:text-white"
        >
          <X />
        </button>
        <BurnTableHeaders />
        <tr className="grid grid-cols-6 text-left text-gray text-white">
          <th>{apeAddress.slice(0, 4) + "..." + apeAddress.slice(-4)}</th>
          <th>{params?.amount}</th>
          <th>0x</th>
          <th>0x1</th>
          <th>1.4x</th>
          <th>{formatBigInt(data, 4)}</th>
        </tr>
      </div>
      <div className="flex justify-center pt-4">
        <div className=" w-[500px] justify-between">
          <BurnForm balance={data} address={address as TAddressString} />
        </div>
      </div>
    </div>
  );
}

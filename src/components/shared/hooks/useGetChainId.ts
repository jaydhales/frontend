import type { TAddressString } from "@/lib/types";
import { useEffect, useState } from "react";
import { fromHex } from "viem";

export default function useGetChainId() {
  const [chainId, setChainId] = useState<number>();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    window?.ethereum?.on("chainChanged", (chain: string | undefined) => {
      if (!chain) return;
      console.log(typeof chain, chain);
      const dec = fromHex(chain as TAddressString, "number");
      setChainId(dec);
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    /* do what you want here */
  }, []);
  return chainId;
}

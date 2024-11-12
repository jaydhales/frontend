/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TAddressString } from "@/lib/types";
import { useEffect, useState } from "react";
import { fromHex } from "viem";
import { useAccount } from "wagmi";

export default function useGetChainId() {
  const [chainId, setChainId] = useState<number>();
  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      if (window.ethereum) {
        window.ethereum
          .request({
            method: "eth_chainId",
          })
          .then((r: `0x${string}`) => {
            setChainId(fromHex(r, "number"));
          });
      }
    }
  }, [isConnected]);
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

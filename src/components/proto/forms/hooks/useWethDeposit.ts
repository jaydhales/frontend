"use client";
import { useSimulateContract } from "wagmi";
import { WethContract } from "@/contracts/weth";
interface Props {
  amount: bigint;
}
export function useWethDeposit({ amount }: Props) {
  const { data } = useSimulateContract({
    abi: WethContract.abi,
    address: WethContract.address,
    functionName: "deposit",
    value: amount,
  });
  return { data };
}

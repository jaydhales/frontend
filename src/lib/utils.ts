import { Assistant } from "@/contracts/assistant";
import { APE_HASH } from "@/data/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { encodePacked, getAddress, keccak256, toHex } from "viem";
import { TAddressString } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function add(n: number, a: number) {
  return n + a;
}

export function getLogoAsset(address: `0x${string}`) {
  return `https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/${getAddress(address)}/logo.png`;
}
/**
 * To compute the leverage ratio: l = 1+2^k where k is the leverageTier.
 * @param LeverageTier - number
 *
 */
export function getLeverageRatio(k: number) {
  const result = 1 + 2 ** k;
  return result;
}
export function getVaultAddress({ vaultId }: { vaultId: number | undefined }) {
  if (vaultId === undefined) {
    return "0xff" as TAddressString;
  }
  const packed = encodePacked(
    ["bytes1", "address", "uint32", "bytes32"],
    ["0xff", Assistant.address, vaultId, keccak256(APE_HASH)],
  );

  const result = keccak256(packed).slice(0, 42) as TAddressString;
  console.log({ result });
  return result;
}

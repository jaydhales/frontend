import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAddress } from "viem";

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

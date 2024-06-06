import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { encodePacked, formatUnits, getAddress, keccak256, toHex } from "viem";
import type { TAddressString } from "./types";
import { assetSchema } from "./schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function add(n: number, a: number) {
  return n + a;
}

export function getLogoAsset(address: `0x${string}` | undefined) {
  if (!address) {
    return "";
  }
  return `https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/${getAddress(address)}/logo.png`;
}
export async function getAssetInfo(address: TAddressString | undefined) {
  if (!address) {
    throw Error("No address provided.");
  }
  const result = await fetch(
    `https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/${getAddress(address)}/info.json`,
  ).then((r) => r.json());
  return assetSchema.safeParse(result);
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

export function getApeAddress({
  vaultId,
  vaultAddress,
  apeHash,
}: {
  vaultId: number | undefined;
  vaultAddress: TAddressString;
  apeHash: TAddressString;
}) {
  if (vaultId === undefined) {
    return "0xff" as TAddressString;
  }
  console.log({ vaultId, vaultAddress, apeHash });
  const packed = encodePacked(
    ["bytes1", "bytes20", "bytes32", "bytes32"],
    ["0xff", vaultAddress, toHex(vaultId, { size: 32 }), apeHash],
  );
  const raw = keccak256(packed);
  const result = ("0x" + raw.slice(-40)) as TAddressString;
  return result;
}

export function formatBigInt(b: bigint | undefined, fixed: number) {
  return parseFloat(parseFloat(formatUnits(b ?? 0n, 18)).toFixed(fixed));
}

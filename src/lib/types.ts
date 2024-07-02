import type { UseFormReturn } from "react-hook-form";
import type { VaultFieldsFragment } from "../../.graphclient";

export type TAddressString = `0x${string}`;
// vaultParams.debtToken, vaultParams.collateralToken, vaultParams.leverageTier, vaultId
export type TPool = {
  debtToken: TAddressString;
  collateralToken: TAddressString;
  leverageTier: LeverageTier;
  vaultId: string;
  iconUrl?: string;
  name: string;
  debtTokenSymbol: string;
  collateralTokenSymbol: string;
};
export type TVaults =
  | {
      vaults: { vaults: VaultFieldsFragment[] };
    }
  | undefined;
export enum LeverageTier {
  "one",
  "two",
  "three",
  "four",
}

export type TBurnRow =
  | {
      User: string;
      leverageTier: string;
      balance: bigint;
      APE: string;
      collateralToken: string;
      debtToken: string;
      collateralSymbol: string;
      debtSymbol: string;
    }
  | undefined;

export type TMintForm = UseFormReturn<TMintFormFields, undefined>;
export interface TMintFormFields {
  long: string;
  versus: string;
  leverageTier: string;
  depositToken: string;
  deposit?: string;
}
export type TMintFormFieldKeys = keyof TMintFormFields;

export type UserQuery = {
  userPositions: {
    User: string;
    leverageTier: string;
    balance: bigint;
    APE: string;
    collateralToken: string;
    debtToken: string;
    collateralSymbol: string;
    debtSymbol: string;
  }[];
};

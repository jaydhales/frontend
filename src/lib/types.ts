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

export enum LeverageTier {
  "one",
  "two",
  "three",
  "four",
}

export type TBurnRow = {
  tokenId: string;
  amount: string;
  tokenLong: string;
  tokenVersus: string;
  leverageRatio: LeverageTier;
  balance: string;
};

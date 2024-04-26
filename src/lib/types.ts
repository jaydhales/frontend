export type TAddressString = `0x${string}`;
// vaultParams.debtToken, vaultParams.collateralToken, vaultParams.leverageTier, vaultId
export type TPool = {
  debtToken: TAddressString;
  collateralToken: TAddressString;
  leverageTier: LeverageTier;
  vaultId: string;
  iconUrl?: string;
  name: string;
  symbol: string;
};

export enum LeverageTier {
  "one",
  "two",
  "three",
  "four",
}

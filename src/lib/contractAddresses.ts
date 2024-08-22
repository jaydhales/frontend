import type { TAddressString } from "./types";
import { ENetworkType } from "./types";

export enum EContracts {
  "SIR",
  "ASSISTANT",
}

export function getAddress(contract: EContracts): TAddressString {
  const network_type = (process.env.NETWORK_TYPE ??
    "PRIVATE") as unknown as ENetworkType;
  checkEnv(network_type);

  if (contract === EContracts.SIR) {
    if (network_type === ENetworkType.PRIVATE) {
      return "0x2aA12f98795E7A65072950AfbA9d1E023D398241" as TAddressString;
    }
    if (network_type === ENetworkType.PRODUCTION) {
      return "" as TAddressString;
    }
    if (network_type === ENetworkType.DEV) {
      return "" as TAddressString;
    }
  }

  if (contract === EContracts.ASSISTANT) {
    if (network_type === ENetworkType.PRIVATE) {
      return "0x9bE634797af98cB560DB23260b5f7C6e98AcCAcf" as TAddressString;
    }
    if (network_type === ENetworkType.PRODUCTION) {
      return "" as TAddressString;
    }
    if (network_type === ENetworkType.DEV) {
      return "" as TAddressString;
    }
  }
  return "" as TAddressString;
}

function checkEnv(s: ENetworkType) {
  if (
    s === ENetworkType.PRODUCTION ||
    s === ENetworkType.PRIVATE ||
    s === ENetworkType.DEV
  ) {
    return;
  } else {
    throw Error("Incorrect network type env.");
  }
}

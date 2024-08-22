import { env } from "@/env";
import type { TAddressString } from "./types";
import { EEnviroment } from "./types";

export enum EContracts {
  "SIR",
  "ASSISTANT",
}
export function getAddress(contract: EContracts): TAddressString {
  const network_type = env.NEXT_PUBLIC_ENV;

  if (contract === EContracts.SIR) {
    if (network_type === EEnviroment.DEV) {
      return "0x2aA12f98795E7A65072950AfbA9d1E023D398241" as TAddressString;
    }
    if (network_type === EEnviroment.TEST) {
      return "" as TAddressString;
    }
    return "" as TAddressString; //prod
  }

  if (contract === EContracts.ASSISTANT) {
    if (network_type === EEnviroment.DEV) {
      return "0x9bE634797af98cB560DB23260b5f7C6e98AcCAcf" as TAddressString;
    }
    if (network_type === EEnviroment.TEST) {
      return "" as TAddressString;
    }
    return "" as TAddressString; //prod
  }
  return "" as TAddressString;
}

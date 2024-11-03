import type { TAddressString } from "@/lib/types";

export const MethContract = {
  address: `0x7Aef48AdbFDc1262161e71Baf205b47316430067` as TAddressString,
  abi: [
    {
      inputs: [],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const,
};

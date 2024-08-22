import type { TAddressString } from "@/lib/types";

export const UserPositionsContract = {
  address: () => "0xf4fa0d1C10c47cDe9F65D56c3eC977CbEb13449A" as TAddressString,
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_vault",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
      ],
      name: "getPositions",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ] as const,
};

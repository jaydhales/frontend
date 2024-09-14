import type { TAddressString } from "@/lib/types";

export const SafeApproveContract = {
  address: "0x3506051f704ceb4EFcF8f93100D318028f00BE86" as TAddressString,
  abi: [
    {
      type: "function",
      name: "approveToken",
      inputs: [
        {
          name: "tokenAddress",
          type: "address",
          internalType: "address",
        },
        { name: "spender", type: "address", internalType: "address" },
        { name: "tokenAmount", type: "uint256", internalType: "uint256" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "error",
      name: "AddressEmptyCode",
      inputs: [{ name: "target", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "AddressInsufficientBalance",
      inputs: [{ name: "account", type: "address", internalType: "address" }],
    },
    { type: "error", name: "FailedInnerCall", inputs: [] },
    {
      type: "error",
      name: "SafeERC20FailedOperation",
      inputs: [{ name: "token", type: "address", internalType: "address" }],
    },
  ] as const,
};

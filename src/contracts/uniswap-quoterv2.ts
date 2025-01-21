import type { TAddressString } from "@/lib/types";

export const UniswapQuoterV2 = {
  address: `0x3ED05DE92879a5D47a3c8cc402DD5259219505aD` as TAddressString,
  abi: [
    {
      inputs: [
        { internalType: "address", name: "factory", type: "address" },
        { internalType: "address", name: "WETH9", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
      ],
      name: "quoteExactInput",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
      ],
      name: "quoteExactOutput",
      outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes", name: "path", type: "bytes" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
      ],
      name: "quoteExactInputSingle",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes", name: "path", type: "bytes" },
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      name: "quoteExactOutputSingle",
      outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ] as const,
};

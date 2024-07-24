import type { TAddressString } from "@/lib/types";

export const AssistantContract = {
  address: "0x82Bd83ec6D4bCC8EaB6F6cF7565efE1e41D92Ce5" as TAddressString,
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "swapRouter_",
          type: "address",
          internalType: "address",
        },
        {
          name: "vault_",
          type: "address",
          internalType: "address",
        },
        {
          name: "hashCreationCodeAPE",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "HASH_CREATION_CODE_APE",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "SWAP_ROUTER",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract ISwapRouter",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "VAULT",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract Vault",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "burnAndSwap",
      inputs: [
        {
          name: "ape",
          type: "address",
          internalType: "address",
        },
        {
          name: "vaultId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
        {
          name: "amountTokens",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "minDebtToken",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "uniswapFeeTier",
          type: "uint24",
          internalType: "uint24",
        },
      ],
      outputs: [
        {
          name: "amountDebtToken",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getAddressAPE",
      inputs: [
        {
          name: "deployer",
          type: "address",
          internalType: "address",
        },
        {
          name: "vaultId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        {
          name: "ape",
          type: "address",
          internalType: "address",
        },
        {
          name: "vaultId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
        {
          name: "amountCollateral",
          type: "uint144",
          internalType: "uint144",
        },
      ],
      outputs: [
        {
          name: "amountTokens",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "mintWithETH",
      inputs: [
        {
          name: "ape",
          type: "address",
          internalType: "address",
        },
        {
          name: "vaultId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
      ],
      outputs: [
        {
          name: "amountTokens",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "onERC1155BatchReceived",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "onERC1155Received",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "priceOfAPE",
      inputs: [
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
      ],
      outputs: [
        {
          name: "num",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "den",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "priceOfTEA",
      inputs: [
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
      ],
      outputs: [
        {
          name: "num",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "den",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "quoteBurn",
      inputs: [
        {
          name: "isAPE",
          type: "bool",
          internalType: "bool",
        },
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
        {
          name: "amountTokens",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "amountCollateral",
          type: "uint144",
          internalType: "uint144",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "quoteMint",
      inputs: [
        {
          name: "isAPE",
          type: "bool",
          internalType: "bool",
        },
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
        {
          name: "amountCollateral",
          type: "uint144",
          internalType: "uint144",
        },
      ],
      outputs: [
        {
          name: "amountTokens",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "swapAndMint",
      inputs: [
        {
          name: "ape",
          type: "address",
          internalType: "address",
        },
        {
          name: "vaultId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "vaultParams",
          type: "tuple",
          internalType: "struct VaultStructs.VaultParameters",
          components: [
            {
              name: "debtToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "collateralToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "leverageTier",
              type: "int8",
              internalType: "int8",
            },
          ],
        },
        {
          name: "amountDebtToken",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "minCollateral",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "uniswapFeeTier",
          type: "uint24",
          internalType: "uint24",
        },
      ],
      outputs: [
        {
          name: "amountTokens",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "error",
      name: "CollateralIsNotWETH",
      inputs: [],
    },
    {
      type: "error",
      name: "NoETHSent",
      inputs: [],
    },
    {
      type: "error",
      name: "VaultDoesNotExist",
      inputs: [],
    },
  ] as const,
};

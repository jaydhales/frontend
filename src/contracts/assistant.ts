export const Assistant = {
  address: "0xf975A646FCa589Be9fc4E0C28ea426A75645fB1f" as `0x${string}`,
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "swapRouter_",
          type: "address",
        },
        {
          internalType: "address",
          name: "vault_",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "VaultDoesNotExist",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "ape",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address",
              name: "debtToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "collateralToken",
              type: "address",
            },
            {
              internalType: "int8",
              name: "leverageTier",
              type: "int8",
            },
          ],
          internalType: "struct VaultStructs.VaultParameters",
          name: "vaultParams",
          type: "tuple",
        },
        {
          internalType: "uint256",
          name: "amountTokens",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "minDebtToken",
          type: "uint256",
        },
        {
          internalType: "uint24",
          name: "uniswapFeeTier",
          type: "uint24",
        },
      ],
      name: "burnAndSwap",
      outputs: [
        {
          internalType: "uint256",
          name: "amountDebtToken",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "ape",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address",
              name: "debtToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "collateralToken",
              type: "address",
            },
            {
              internalType: "int8",
              name: "leverageTier",
              type: "int8",
            },
          ],
          internalType: "struct VaultStructs.VaultParameters",
          name: "vaultParams",
          type: "tuple",
        },
        {
          internalType: "uint144",
          name: "amountCollateral",
          type: "uint144",
        },
      ],
      name: "mint",
      outputs: [
        {
          internalType: "uint256",
          name: "amountTokens",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155BatchReceived",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "debtToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "collateralToken",
              type: "address",
            },
            {
              internalType: "int8",
              name: "leverageTier",
              type: "int8",
            },
          ],
          internalType: "struct VaultStructs.VaultParameters",
          name: "vaultParams",
          type: "tuple",
        },
      ],
      name: "priceOfAPE",
      outputs: [
        {
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "den",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "debtToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "collateralToken",
              type: "address",
            },
            {
              internalType: "int8",
              name: "leverageTier",
              type: "int8",
            },
          ],
          internalType: "struct VaultStructs.VaultParameters",
          name: "vaultParams",
          type: "tuple",
        },
      ],
      name: "priceOfTEA",
      outputs: [
        {
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "den",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bool",
          name: "isAPE",
          type: "bool",
        },
        {
          components: [
            {
              internalType: "address",
              name: "debtToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "collateralToken",
              type: "address",
            },
            {
              internalType: "int8",
              name: "leverageTier",
              type: "int8",
            },
          ],
          internalType: "struct VaultStructs.VaultParameters",
          name: "vaultParams",
          type: "tuple",
        },
        {
          internalType: "uint256",
          name: "amountTokens",
          type: "uint256",
        },
      ],
      name: "quoteBurn",
      outputs: [
        {
          internalType: "uint144",
          name: "amountCollateral",
          type: "uint144",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bool",
          name: "isAPE",
          type: "bool",
        },
        {
          components: [
            {
              internalType: "address",
              name: "debtToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "collateralToken",
              type: "address",
            },
            {
              internalType: "int8",
              name: "leverageTier",
              type: "int8",
            },
          ],
          internalType: "struct VaultStructs.VaultParameters",
          name: "vaultParams",
          type: "tuple",
        },
        {
          internalType: "uint144",
          name: "amountCollateral",
          type: "uint144",
        },
      ],
      name: "quoteMint",
      outputs: [
        {
          internalType: "uint256",
          name: "amountTokens",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "ape",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address",
              name: "debtToken",
              type: "address",
            },
            {
              internalType: "address",
              name: "collateralToken",
              type: "address",
            },
            {
              internalType: "int8",
              name: "leverageTier",
              type: "int8",
            },
          ],
          internalType: "struct VaultStructs.VaultParameters",
          name: "vaultParams",
          type: "tuple",
        },
        {
          internalType: "uint256",
          name: "amountDebtToken",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "minCollateral",
          type: "uint256",
        },
        {
          internalType: "uint24",
          name: "uniswapFeeTier",
          type: "uint24",
        },
      ],
      name: "swapAndMint",
      outputs: [
        {
          internalType: "uint256",
          name: "amountTokens",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "swapRouter",
      outputs: [
        {
          internalType: "contract ISwapRouter",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "vault",
      outputs: [
        {
          internalType: "contract Vault",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ] as const,
};

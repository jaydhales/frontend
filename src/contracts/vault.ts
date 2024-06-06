import type { TAddressString } from "@/lib/types";

export const VaultContract = {
  address: "0x2ca60d89144D4cdf85dA87af4FE12aBF9265F28C" as TAddressString,
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "systemControl",
          type: "address",
        },
        {
          internalType: "address",
          name: "sir",
          type: "address",
        },
        {
          internalType: "address",
          name: "oracle",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "LengthMismatch",
      type: "error",
    },
    {
      inputs: [],
      name: "NotAuthorized",
      type: "error",
    },
    {
      inputs: [],
      name: "TEAMaxSupplyExceeded",
      type: "error",
    },
    {
      inputs: [],
      name: "UnsafeRecipient",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "vaultIds",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "value",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "URI",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint48",
          name: "vault",
          type: "uint48",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "tax",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "cumTax",
          type: "uint16",
        },
      ],
      name: "VaultNewTax",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "APES",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "owners",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "vaultIds",
          type: "uint256[]",
        },
      ],
      name: "balanceOfBatch",
      outputs: [
        {
          internalType: "uint256[]",
          name: "balances_",
          type: "uint256[]",
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
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [
        {
          internalType: "uint144",
          name: "collateralWidthdrawn",
          type: "uint144",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "lper",
          type: "address",
        },
      ],
      name: "claimSIR",
      outputs: [
        {
          internalType: "uint80",
          name: "",
          type: "uint80",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
      ],
      name: "cumulativeSIRPerTEA",
      outputs: [
        {
          internalType: "uint176",
          name: "cumSIRPerTEAx96",
          type: "uint176",
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
      name: "getReserves",
      outputs: [
        {
          components: [
            {
              internalType: "uint144",
              name: "reserveApes",
              type: "uint144",
            },
            {
              internalType: "uint144",
              name: "reserveLPers",
              type: "uint144",
            },
            {
              internalType: "int64",
              name: "tickPriceX42",
              type: "int64",
            },
          ],
          internalType: "struct VaultStructs.Reserves",
          name: "",
          type: "tuple",
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
      name: "initialize",
      outputs: [],
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
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestTokenParams",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "symbol",
              type: "string",
            },
            {
              internalType: "uint8",
              name: "decimals",
              type: "uint8",
            },
          ],
          internalType: "struct VaultStructs.TokenParameters",
          name: "",
          type: "tuple",
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
          name: "",
          type: "tuple",
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
      ],
      name: "mint",
      outputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "numberOfVaults",
      outputs: [
        {
          internalType: "uint256",
          name: "",
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
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "paramsById",
      outputs: [
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
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "vaultIds",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "systemParams",
      outputs: [
        {
          internalType: "uint40",
          name: "tsIssuanceStart",
          type: "uint40",
        },
        {
          internalType: "uint16",
          name: "baseFee",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "lpFee",
          type: "uint16",
        },
        {
          internalType: "bool",
          name: "mintingStopped",
          type: "bool",
        },
        {
          internalType: "uint16",
          name: "cumTax",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "collateral",
          type: "address",
        },
      ],
      name: "tokenStates",
      outputs: [
        {
          internalType: "uint112",
          name: "collectedFees",
          type: "uint112",
        },
        {
          internalType: "uint144",
          name: "total",
          type: "uint144",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
      ],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "lper",
          type: "address",
        },
      ],
      name: "unclaimedRewards",
      outputs: [
        {
          internalType: "uint80",
          name: "",
          type: "uint80",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "baseFee",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "lpFee",
          type: "uint16",
        },
        {
          internalType: "bool",
          name: "mintingStopped",
          type: "bool",
        },
      ],
      name: "updateSystemState",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint48[]",
          name: "oldVaults",
          type: "uint48[]",
        },
        {
          internalType: "uint48[]",
          name: "newVaults",
          type: "uint48[]",
        },
        {
          internalType: "uint8[]",
          name: "newTaxes",
          type: "uint8[]",
        },
        {
          internalType: "uint16",
          name: "cumTax",
          type: "uint16",
        },
      ],
      name: "updateVaults",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "vaultId",
          type: "uint256",
        },
      ],
      name: "uri",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
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
      name: "vaultStates",
      outputs: [
        {
          internalType: "uint144",
          name: "reserve",
          type: "uint144",
        },
        {
          internalType: "int64",
          name: "tickPriceSatX42",
          type: "int64",
        },
        {
          internalType: "uint48",
          name: "vaultId",
          type: "uint48",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint48",
          name: "vaultId",
          type: "uint48",
        },
      ],
      name: "vaultTax",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "withdrawFees",
      outputs: [
        {
          internalType: "uint112",
          name: "collectedFees",
          type: "uint112",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "tokens",
          type: "address[]",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "withdrawToSaveSystem",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const,
};

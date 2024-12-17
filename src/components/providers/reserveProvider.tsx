"use client";
import React, { createContext, useContext, useRef } from "react";
import { useVaultProvider } from "./vaultProvider";
import { TVaults, VaultFieldFragment } from "@/lib/types";
import { api } from "@/trpc/react";

interface ReserveProviderType {
  tVaults: TVaults;
}

const ReserveContext = createContext<ReserveProviderType | undefined>(
  undefined,
);
// Utils function to create an Hashmap for every TReserve Index
// Ex. {'1':0, '2':0, ...}
const createNumberObject = (length: number): Record<string, number> => {
  const result: Record<string, number> = {};
  for (let i = 1; i <= length; i++) {
    result[i.toString()] = 0;
  }
  return result;
};
interface Props {
  children: React.ReactNode;
  offset: number;
}

export const ReserveProvider = ({ children, offset }: Props) => {
  const callIds = useRef(createNumberObject(0));
  const { vaults } = useVaultProvider();
  let pageVaults: VaultFieldFragment[] | undefined = [];
  if (vaults) {
    if (isFinite(offset)) {
      pageVaults = vaults?.slice(offset, offset + 10);
    } else {
      pageVaults = vaults;
    }
  }

  const vaultIds = pageVaults?.map((v) => parseInt(v.vaultId));
  const { data: reserves } = api.vault.getReserves.useQuery({ vaultIds });

  const tVaults = {
    vaults: vaults?.map((v, i) => ({
      ...v,
      apeCollateral: reserves?.[i]?.reserveApes ?? 0n,
      teaCollateral: reserves?.[i]?.reserveLPers ?? 0n,
    })),
  } as TVaults;
  return (
    <ReserveContext.Provider value={{ tVaults }}>
      {children}
    </ReserveContext.Provider>
  );
};

// Custom hook to use the context
export const useReserveProvider = () => {
  const context = useContext(ReserveContext);
  if (!context) {
    throw new Error("useReserveProvider must be used within a MyProvider");
  }
  return context;
};

// Graph Reserves - Vaults from Subgraph query
// Have a global state with Graph Reserves
// For every page grab reserves
// Have loader on Reserves for reserve amounts
// ** Graph Reserves will remain the same, however, we will grab individual
// Full refresh will get all new Graph Reserves Though

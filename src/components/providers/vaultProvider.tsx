"use client";
import type { TVault, VaultFieldFragment } from "@/lib/types";
import { api } from "@/trpc/react";
import { skipToken } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useRef } from "react";

interface VaultProviderType {
  vaults: VaultFieldFragment[] | undefined;
}

const VaultContext = createContext<VaultProviderType | undefined>(undefined);
// Utils function to create an Hashmap for every TVault Index
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
  graphVaults: VaultFieldFragment[];
}

export const VaultProvider = ({ children, graphVaults }: Props) => {
  const callIds = useRef(createNumberObject(graphVaults?.length ?? 0));
  const { data: vaultData } = api.vault.getVaults.useQuery(skipToken, {
    initialData: { vaults: graphVaults },
    refetchOnMount: false,
  });
  const vaults = useMemo(() => {
    return vaultData.vaults;
  }, [vaultData]);
  return (
    <VaultContext.Provider value={{ vaults }}>{children}</VaultContext.Provider>
  );
};

// Custom hook to use the context
export const useVaultProvider = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error("useVaultProvider must be used within a MyProvider");
  }
  return context;
};

// Graph Vaults - Vaults from Subgraph query
// Have a global state with Graph Vaults
// For every page grab reserves
// Have loader on Vaults for reserve amounts
// ** Graph Vaults will remain the same, however, we will grab individual
// Full refresh will get all new Graph Vaults Though

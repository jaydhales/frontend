import { api } from "@/trpc/react";
import type { ReactNode } from "react";
import React, { createContext, useContext, useRef, useState } from "react";

interface VaultProviderType {}

const VaultContext = createContext<VaultProviderType | undefined>(undefined);
// Utils function to create an Hashmap for every TVault
// Ex {'1':0, '2':0, ...}
const createNumberObject = (length: number): Record<string, number> => {
  const result: Record<string, number> = {};
  for (let i = 1; i <= length; i++) {
    result[i.toString()] = 0;
  }
  return result;
};
export const VaultProvider = ({ children }: { children: ReactNode }) => {
  const callIds = useRef(createNumberObject(4));

  // get TVaults from server
  // get query
  // return function to update single vault
  //
  api.vault.getReserves.useQuery({ vaultId: 1 }, {});
  return <VaultContext.Provider value={{}}>{children}</VaultContext.Provider>;
};

// Custom hook to use the context
export const useVaultProvider = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error("useVaultProvider must be used within a MyProvider");
  }
  return context;
};

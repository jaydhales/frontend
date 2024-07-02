import React, { createContext, useContext } from "react";
import type { UserQuery } from "@/lib/types";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
interface state {
  data: UserQuery | undefined;
}

const BurnTableProviderContext = createContext<state | undefined>(undefined);
export function useBurnTableProvider() {
  const context = useContext(BurnTableProviderContext);
  if (context === undefined) {
    throw new Error(
      "useBurnTableProvider must be used within a MintFormProvider",
    );
  }
  return context;
}

export default function BurnTableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = api.user.getPositions.useQuery(
    { address },
    {
      enabled: Boolean(address),
    },
  );
  data?.userPositions;

  return (
    <BurnTableProviderContext.Provider value={{ data }}>
      {children}
    </BurnTableProviderContext.Provider>
  );
}

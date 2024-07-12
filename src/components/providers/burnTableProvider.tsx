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
      "useBurnTableProvider must be used within a MintFormProvider"
    );
  }
  return context;
}

export default function BurnTableProvider({
  children,
  isApe,
}: {
  isApe: boolean;
  children: React.ReactNode;
}) {
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: apePositions } = api.user.getApePositions.useQuery(
    { address },
    {
      enabled: Boolean(address) && isApe,
    }
  );
  const { data: teaPositions } = api.user.getTeaPositions.useQuery(
    { address },
    { enabled: Boolean(address) && !isApe }
  );

  const data = isApe ? apePositions : teaPositions;
  return (
    <BurnTableProviderContext.Provider value={{ data }}>
      {children}
    </BurnTableProviderContext.Provider>
  );
}

import React, { createContext, useContext } from "react";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import type {
  userTeaPositionsQuery,
  userApePositionsQuery,
} from "@/server/queries/vaults";
interface state {
  teaPositions: userTeaPositionsQuery | undefined;
  apePositions: userApePositionsQuery | undefined;
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
    },
  );

  return (
    <BurnTableProviderContext.Provider value={{ teaPositions, apePositions }}>
      {children}
    </BurnTableProviderContext.Provider>
  );
}

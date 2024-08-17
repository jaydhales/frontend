import type { TAddressString } from "@/lib/types";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
export function useTeaAndApeBals({
  apeAddress,
  isApe,
  vaultId,
}: {
  apeAddress?: TAddressString;
  isApe: boolean;
  vaultId: string;
}) {
  const { address } = useAccount();
  const { data: apeBal } = api.user.getApeBalance.useQuery(
    {
      address: apeAddress,
      user: address,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      enabled: isApe,
      // enabled: false,
    },
  );
  const { data: teaBal } = api.user.getTeaBalance.useQuery(
    {
      user: address,
      vaultId: vaultId,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      enabled: !isApe,
    },
  );
  return { apeBal, teaBal };
}

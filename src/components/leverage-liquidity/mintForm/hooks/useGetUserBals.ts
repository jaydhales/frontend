import type { TMintFormFields } from "@/components/providers/mintFormProvider";
import { parseAddress } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";

export default function useGetUserBals() {
  const { address } = useAccount();
  const form = useFormContext<TMintFormFields>();
  const formData = form.watch();
  const { data: userEthBalance } = api.user.getEthBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );
  const { data: collateralDecimals } = api.erc20.getErc20Decimals.useQuery(
    {
      tokenAddress: parseAddress(formData.long) ?? "0x",
    },
    {
      enabled: Boolean(formData.long) && Boolean(formData.versus),
    },
  );

  const { data: debtDecimals } = api.erc20.getErc20Decimals.useQuery(
    {
      tokenAddress: parseAddress(formData.versus) ?? "0x",
    },
    {
      enabled: Boolean(formData.long) && Boolean(formData.versus),
    },
  );
  const depositDecimals =
    formData.depositToken === parseAddress(formData.long)
      ? collateralDecimals
      : debtDecimals;
  return { userEthBalance, collateralDecimals, debtDecimals, depositDecimals };
}

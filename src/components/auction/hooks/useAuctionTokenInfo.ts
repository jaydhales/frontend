import { Address } from "viem";
import { useAccount } from "wagmi";
import { api } from "@/trpc/react";
import { SirContract } from "@/contracts/sir";

type Props = {
  tokenAddress?: string;
};

export default function useAuctionTokenInfo({ tokenAddress }: Props) {
  const { address: userAddress } = useAccount();

  const { data: userBalance, isFetching } =
    api.user.getBalanceAndAllowance.useQuery(
      {
        userAddress,
        tokenAddress,
        spender: SirContract.address,
      },
      {
        enabled: Boolean(userAddress) && Boolean(tokenAddress),
      },
    );

  const { data: tokenDecimals } = api.erc20.getErc20Decimals.useQuery(
    {
      tokenAddress: tokenAddress ?? "0x",
    },
    {
      enabled: Boolean(tokenAddress),
    },
  );

  return {
    userBalance,
    tokenDecimals,
    userBalanceFetching: isFetching,
  };
}

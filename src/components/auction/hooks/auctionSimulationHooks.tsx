import { api } from "@/trpc/react";
import { zeroAddress, type Address } from "viem";

export const useStartAuction = ({ id }: { id?: string }) => {
  const { data: request, error } =
    api.auction.simulateCollectFeesAndStartAuction.useQuery(id as Address, {
      enabled: Boolean(id && id.length > 0),
    });

  if (error) {
    console.log(error, "start auction error", request);
  }

  return request;
};

export const useBid = ({
  token,
  amount,
  tokenDecimals,
}: {
  token?: string;
  amount: string;
  tokenDecimals?: number;
}) => {
  const { data: request, error } = api.auction.simulateBid.useQuery(
    { token: token ?? zeroAddress, amount, tokenDecimals: tokenDecimals ?? 18 },
    {
      enabled: Boolean(token && amount),
    },
  );

  if (error) {
    console.log(error, "bid error", request);
  }

  return request;
};
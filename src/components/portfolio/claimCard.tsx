import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatEther, formatUnits } from "viem";
import { useClaim } from "../stake/hooks/useClaim";
import TransactionModal from "../shared/transactionModal";

export default function ClaimCard() {
  const [openModal, setOpenModal] = useState(false);

  const { claimData, isFetching: claimFetching } = useClaim();

  const { isConnected, address } = useAccount();
  const { data: ethBalance } = api.user.getEthBalance.useQuery(
    {
      userAddress: address,
    },
    {
      enabled: isConnected,
    },
  );

  const { data: dividends } = api.user.getDividends.useQuery(
    { staker: address },
    {
      enabled: isConnected,
    },
  );

  const { writeContract, data: hash, isPending, reset } = useWriteContract();
  const { isSuccess: isConfirmed, isLoading: isConfirming } =
    useWaitForTransactionReceipt({ hash });
  const onSubmit = () => {
    console.log("e");
    if (claimData?.request) {
      writeContract(claimData.request);
    }
  };
  useEffect(() => {
    if (openModal && isConfirmed) {
      //invalidate
      reset();
    }
  }, [isConfirmed, openModal, reset]);
  const isLoading = isPending || isConfirming;
  return (
    <div className=" border-secondary-300">
      <TransactionModal.Root setOpen={setOpenModal} open={openModal}>
        <TransactionModal.InfoContainer>
          {formatUnits(dividends ?? 0n, 18)} Eth
        </TransactionModal.InfoContainer>
        <TransactionModal.Close setOpen={setOpenModal} />
        <TransactionModal.StatSubmitContainer>
          <TransactionModal.SubmitButton
            disabled={isLoading}
            loading={isLoading}
            onClick={() => {
              if (!isConfirmed) onSubmit();
              else setOpenModal(false);
            }}
          >
            <>
              {isConfirmed && "Close"}
              {!isConfirmed && "Claim"}
            </>
          </TransactionModal.SubmitButton>
        </TransactionModal.StatSubmitContainer>
      </TransactionModal.Root>
      {/* <claimDataModal open={openModal} setOpen={setOpenModal} /> */}
      <div className="rounded-md bg-secondary-400 px-2 py-2 text-2xl">
        <h2 className="flex items-center gap-x-1 pb-1 text-sm text-gray-200 ">
          <span>claimDataable Dividends</span>
        </h2>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl">
            {formatEther(dividends ?? 0n)}
            <span className="text-sm text-gray-500"> ETH</span>
          </h3>
          <Button onClick={() => setOpenModal(true)} className="py-2">
            claimData
          </Button>
        </div>
      </div>
    </div>
  );
}

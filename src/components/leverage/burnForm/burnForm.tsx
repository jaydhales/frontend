import React, { useEffect } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import type { TAddressString } from "@/lib/types";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useBurnApe } from "./hooks/useBurnApe";
import { formatUnits, parseUnits } from "viem";
import { formatBigInt } from "@/lib/utils";
import { useCheckValidityBurn } from "./hooks/useCheckValidityBurn";
import { SectionTwo } from "./sectionTwo";
import ProgressAlert from "../mintForm/progressAlert";
import { BalancePercent } from "@/components/shared/balancePercent";
import { Section } from "./section";

const BurnSchema = z.object({
  deposit: z.string().optional(),
});
export type TBurnForm = UseFormReturn<
  { deposit?: string | undefined },
  undefined
>;
export type TBurnFields = { deposit?: string | undefined };
export default function BurnForm({
  address,
  balance,
  collateralSymbol,
}: {
  address: undefined | TAddressString;
  balance: bigint | undefined;
  collateralSymbol: string | undefined;
}) {
  const form = useForm<z.infer<typeof BurnSchema>>({
    resolver: zodResolver(BurnSchema),
  });
  const formData = form.watch();

  const { data } = api.vault.getApeParams.useQuery(
    { address: address ?? "" },
    { enabled: Boolean(address) },
  );

  const { data: quoteBurn } = api.vault.quoteBurn.useQuery(
    {
      amount: formData.deposit,
      debtToken: data?.debtToken,
      leverageTier: data?.leverageTier,
      collateralToken: data?.collateralToken,
    },
    {
      enabled: Boolean(formData.deposit),
    },
  );

  const { writeContract, data: writeData, isPending } = useWriteContract();
  const {
    data: receiptData,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    // isError: isErrorConfirming,
  } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  const utils = api.useUtils();
  useEffect(() => {
    if (receiptData) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      utils.user.getApeBalance.invalidate().catch((e) => {
        console.log(e);
      });
    }
  }, [receiptData, utils.user.getApeBalance]);
  const { data: burnData } = useBurnApe({
    data,
    apeAddress: address ?? "0x",
    amount: parseUnits(formData.deposit?.toString() ?? "0", 18),
  });
  const { isValid, error } = useCheckValidityBurn(formData, balance);
  const onSubmit = () => {
    if (burnData?.request) {
      writeContract(burnData.request);
    }
  };
  return (
    <Form {...form}>
      <ProgressAlert
        isTxSuccess={isConfirmed}
        isTxPending={isConfirming}
        waitForSign={isPending}
      />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label htmlFor="a" className="">
            Burn Amount
          </label>
          <Section balance={balance} bg="bg-primary" form={form} />
          <div className="pt-2"></div>
          <div>
            <label htmlFor="a" className="">
              Into
            </label>
          </div>

          <SectionTwo
            data={data}
            amount={quoteBurn}
            collateralSymbol={collateralSymbol}
            bg=""
          />
          <div className="pt-2"></div>
          <div className="flex justify-center">
            <h4 className="w-[400px] text-center text-sm italic text-gray">
              With leveraging you risk losing up to 100% of your deposit, you
              can not lose more than your deposit.
            </h4>
          </div>
          <div className="pt-1"></div>
          <Button
            disabled={
              !isValid ||
              !Boolean(burnData?.request) ||
              !Boolean(formData.deposit)
            }
            variant="submit"
            className="w-full"
            type="submit"
          >
            Burn TEA
          </Button>
          <div className="h-5 text-sm text-red-400">
            {error && <p>{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
}

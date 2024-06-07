import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import type { TAddressString } from "@/lib/types";
import { useWriteContract } from "wagmi";
import { useBurnApe } from "./hooks/useBurnApe";
import { formatUnits, parseUnits } from "viem";
import { formatBigInt } from "@/lib/utils";
import { useCheckValidityBurn } from "./hooks/useCheckValidityBurn";
import { SectionTwo } from "./sectionTwo";

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
}: {
  address: undefined | TAddressString;
  balance: bigint | undefined;
}) {
  const form = useForm<z.infer<typeof BurnSchema>>({
    resolver: zodResolver(BurnSchema),
  });
  const formData = form.watch();

  const { data } = api.vault.getApeParams.useQuery(
    { address: address ?? "" },
    { enabled: Boolean(address) },
  );

  const { data: quoteBurn } = api.vault.quoteBurn.useQuery({
    amount: formData.deposit,
    debtToken: data?.debtToken,
    leverageTier: data?.leverageTier,
    collateralToken: data?.collateralToken,
  });
  const { writeContract } = useWriteContract();
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

          <SectionTwo data={data} amount={quoteBurn} bg="" />
          <div className="pt-2"></div>
          <div className="flex justify-center">
            <h4 className="w-[400px] text-center text-[16px] italic text-gray">
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

function Section({
  form,
  bg,
  balance,
}: {
  form: TBurnForm;
  bg: string;
  balance: bigint | undefined;
}) {
  return (
    <div className={`w-full rounded-md ${bg} px-2 py-3`}>
      <div className="flex justify-between">
        <FormField
          control={form.control}
          name="deposit"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="a"
                  placeholder="0"
                  textSize="xl"
                  type="string"
                  inputMode="decimal"
                  autoComplete="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  {...field}
                  onChange={(e) => {
                    const pattern = /^[0-9]*[.,]?[0-9]*$/;
                    if (pattern.test(e.target.value))
                      return field.onChange(e.target.value);
                  }}
                ></Input>
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <div className="flex h-[45px] w-[140px] items-center gap-x-2 rounded-md bg-secondary px-2">
            <div className="h-[28px] w-[28px] rounded-full bg-primary"></div>
            <h3>TEA</h3>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between pt-2">
        <span className="text-sm font-medium text-light-blue-100">
          Max 50% 25%
        </span>
        <span className="text-sm italic text-gray">
          Balance {formatBigInt(balance, 4)}
        </span>
      </div>
    </div>
  );
}

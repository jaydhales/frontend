import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/trpc/react";
import type { TAddressString } from "@/lib/types";
import { useWriteContract } from "wagmi";
import { useBurnApe } from "./hooks/useBurnApe";
import { parseUnits } from "viem";
import { formatBigInt, getAssetInfo, getLogoAsset } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useCheckValidityBurn } from "./hooks/useCheckValidityBurn";

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
  const { writeContract } = useWriteContract();
  const { data: burnData } = useBurnApe({
    data,
    apeAddress: address ?? "0x",
    amount: parseUnits(formData.deposit?.toString() ?? "0", 18),
  });
  const {} = useCheckValidityBurn();
  const onSubmit = () => {
    console.log("RAN ??");
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

          <SectionTwo data={data} bg="" />
          <div className="pt-2"></div>
          <div className="flex justify-center">
            <h4 className="w-[400px] text-center text-[16px] italic text-gray">
              With leveraging you risk losing up to 100% of your deposit, you
              can not lose more than your deposit.
            </h4>
          </div>
          <div className="pt-1"></div>
          <Button
            disabled={!Boolean(burnData?.request)}
            variant="submit"
            className="w-full"
            type="submit"
          >
            Burn TEA
          </Button>
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
                  type="number"
                  {...field}
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

function SectionTwo({
  bg,
  data,
}: {
  bg: string;
  data:
    | {
        leverageTier: number | undefined;
        debtToken: `0x${string}` | undefined;
        collateralToken: `0x${string}` | undefined;
      }
    | undefined;
}) {
  const { data: assetData } = useQuery({
    queryFn: () => getAssetInfo(data?.collateralToken),
    queryKey: [data?.collateralToken],
  });

  return (
    <div className={`w-full  rounded-md ${bg} `}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-[28px]">22.44</h2>
        </div>
        <div>
          <div className={"flex  gap-x-2 "}>
            <div className="flex h-[45px] w-[140px] items-center gap-x-2 rounded-md bg-primary px-2">
              <Image
                src={getLogoAsset(data?.collateralToken)}
                alt="collateral"
                width={28}
                height={28}
              />
              <h3>{assetData?.success ? assetData?.data?.symbol : "?"}</h3>
            </div>

            {/* KEEP FOR FUTURE */}
            {/* <div className="flex-grow">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className="h-[45px] w-[140px] "
                          colorScheme="light"
                        >
                          <SelectValue placeholder={"Select token"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.collateralToken && (
                          <SelectItem value={data.collateralToken}>
                            Collateral
                          </SelectItem>
                        )}
                        {data?.debtToken && (
                          <SelectItem value={data.debtToken}>Debt</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between pt-1">
        <span className="text-sm font-medium text-gray">$22.44</span>
        {/* <span className="text-sm italic text-gray">Balance $232.23</span> */}
      </div>
    </div>
  );
}

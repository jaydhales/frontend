import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { TAddressString } from "@/lib/types";
import { useWriteContract } from "wagmi";
import { useBurnApe } from "./hooks/useBurnApe";

const BurnSchema = z.object({
  deposit: z.coerce.number(),
  token: z.string(),
});
export default function BurnForm({
  address,
}: {
  address: undefined | TAddressString;
}) {
  const form = useForm<z.infer<typeof BurnSchema>>({
    resolver: zodResolver(BurnSchema),
  });
  const { data } = api.vault.getApeParams.useQuery(
    { address: address ?? "" },
    { enabled: Boolean(address) },
  );
  const { writeContract } = useWriteContract();
  const { data: burnData } = useBurnApe({
    data,
    apeAddress: address ?? "0x",
    amount: 0n,
  });
  const onSubmit = () => {
    if (burnData?.request) {
      writeContract(burnData.request);
    }
  };
  return (
    <Form {...form}>
      <div className="space-y-2">
        <label htmlFor="a" className="">
          Burn Amount
        </label>
        <Section bg="bg-primary" form={form} />
        <div className="pt-2"></div>
        <div>
          <label htmlFor="a" className="">
            Into
          </label>
        </div>

        <SectionTwo data={data} bg="" form={form} />
        <div className="pt-2"></div>
        <div className="flex justify-center">
          <h4 className="w-[400px] text-center text-[16px] italic text-gray">
            With leveraging you risk losing up to 100% of your deposit, you can
            not lose more than your deposit.
          </h4>
        </div>
        <div className="pt-1"></div>
        <Button variant="submit" className="w-full">
          Burn TEA
        </Button>
      </div>
    </Form>
  );
}

function Section({
  form,
  bg,
}: {
  form: UseFormReturn<
    {
      deposit: number;
      token: string;
    },
    undefined
  >;
  bg: string;
}) {
  return (
    <div className={`w-full  rounded-md ${bg} px-2 py-3`}>
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
        <span className="text-sm italic text-gray">Balance $232.23</span>
      </div>
    </div>
  );
}

function SectionTwo({
  form,
  bg,
  data,
}: {
  form: UseFormReturn<
    {
      deposit: number;
      token: string;
    },
    undefined
  >;
  bg: string;
  data:
    | {
        leverageTier: number | undefined;
        debtToken: `0x${string}` | undefined;
        collateralToken: `0x${string}` | undefined;
      }
    | undefined;
}) {
  return (
    <div className={`w-full  rounded-md ${bg} `}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-[28px]">22.44</h2>
        </div>
        <div>
          <div className={"flex  gap-x-2 "}>
            <div className="flex-grow">
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between pt-1">
        <span className="text-sm font-medium text-gray">$22.44</span>
        <span className="text-sm italic text-gray">Balance $232.23</span>
      </div>
    </div>
  );
}

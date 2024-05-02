"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { SelectItem } from "../../ui/select";
import { Input } from "../../ui/input";
import SearchSelect from "@/components/shared/Select";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/dropDown";
import { useMintFormProvider } from "@/components/providers/mintFormProvider";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
// import { Input } from "../ui/input";

export default function MintForm() {
  const { form } = useMintFormProvider();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [tokenDeposits, setTokenDeposits] = useState<{
    versus: string | undefined;
    long: string | undefined;
  }>({ long: undefined, versus: undefined });

  const formData = form.watch();
  useEffect(() => {
    if (formData.versus) {
      if (formData.versus !== tokenDeposits.versus) {
        setTokenDeposits((s) => ({ ...s, versus: formData.versus }));
        form.setValue("depositToken", formData.versus);
      }
    }
    if (!formData.versus) {
      setTokenDeposits((s) => ({ ...s, versus: undefined }));
      form.setValue("depositToken", "");
    }
    if (!formData.long) {
      setTokenDeposits((s) => ({ ...s, long: "" }));
    }
    if (formData.long) {
      if (formData.long !== tokenDeposits.long) {
        setTokenDeposits((s) => ({ ...s, long: formData.long }));
      }
    }
  }, [
    formData.long,
    formData.versus,
    tokenDeposits.versus,
    tokenDeposits.long,
    form,
  ]);
  const { versus, leverageTiers, long } = useSelectMemo({ formData });
  const tokenDepositSelects = Object.values(tokenDeposits).filter((s) => s);
  const { address } = useAccount();
  const userBalance = api.user.getBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(false) },
  );
  console.log({ userBalance });
  return (
    <Card className="space-y-4">
      <Form {...form}>
        <div className=" grid grid-cols-3 gap-x-4">
          <SearchSelect
            name="long"
            title="Go long:"
            form={form}
            items={long.map((e) => ({
              label: e,
              value: e,
              imageUrl:
                "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
            }))}
          />

          <SearchSelect
            name="versus"
            title="Versus:"
            form={form}
            items={versus.map((e) => ({
              label: e,
              value: e,
              imageUrl:
                "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
            }))}
          />
          <SearchSelect
            placeholder="Select Tier"
            items={leverageTiers.map((e) => ({
              label: e.toString(),
              value: e.toString(),
            }))}
            noSearch
            name="leverageTier"
            title="Leverage Tier:"
            form={form}
          />
        </div>
        <div>
          <FormLabel htmlFor="deposit">Deposit:</FormLabel>

          <div className="pt-1"></div>
          <div className="flex justify-between rounded-md bg-card-foreground p-3">
            <div>
              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="0" textSize="xl" {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <h2 className="pt-1 text-sm text-[#B6B6C9]">$22.55</h2>
            </div>
            <div>
              <Dropdown
                name="depositToken"
                colorScheme={"dark"}
                form={form}
                disabled={tokenDepositSelects.length === 0}
                title="Deposit Token:"
              >
                {tokenDepositSelects.map((s) => (
                  <SelectItem key={s} value={s ?? ""}>
                    {s}
                  </SelectItem>
                ))}
                {/* <SelectItem value="burn">Burn</SelectItem> */}
              </Dropdown>
              <h2 className="pt-1 text-sm text-[#B6B6C9]">Balance: $232.32</h2>
              <h2 className="text-[#26DEC8]">25% 50% Max</h2>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-sm">You recieve:</h2>
          <div className="pt-1"></div>
          <div className="rounded-md bg-card-foreground p-3">
            <h2 className="text-xl">12 APE</h2>
            <h2 className=" text-sm italic text-gray">{"$20.55 (-X.XX%)"}</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <p className="w-[450px]  pb-2 text-center text-sm text-gray">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
          <Button variant={"submit"} type="submit">
            Mint
          </Button>
        </div>
      </Form>
    </Card>
  );
}

// <SelectItem value="mint">Mint</SelectItem>

import Dropdown from "@/components/shared/dropDown";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { TMintForm } from "@/lib/types";
import { getLogoAsset } from "@/lib/utils";
interface Props {
  form: TMintForm;
  tokenDepositSelects: {
    value: string;
    label: string;
  }[];
}
export default function DepositInputs({ form, tokenDepositSelects }: Props) {
  return (
    <div className="flex justify-between rounded-md bg-primary p-3">
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
          className="w-[150px]"
          disabled={tokenDepositSelects.length === 0}
          title="Deposit Token:"
        >
          {tokenDepositSelects.map((s) => {
            return (
              <SelectItem key={s.value} value={s.label} className=" ">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={getLogoAsset(
                      (s.value.split(",")[0] as `0x${string}`) ?? "0x",
                    )}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  {s.label}
                </div>
              </SelectItem>
            );
          })}
        </Dropdown>
        <h2 className="pt-1 text-right text-sm text-[#B6B6C9]">
          Balance: $232.32
        </h2>
        <h2 className="text-right text-[#26DEC8]">25% 50% Max</h2>
      </div>
    </div>
  );
}

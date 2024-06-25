import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TMintForm } from "@/lib/types";
import { BalancePercent } from "@/components/shared/balancePercent";

import Select from "@/components/shared/Select";
import { getLogoAsset } from "@/lib/utils";
interface Props {
  form: TMintForm;
  tokenDepositSelects: {
    value: string;
    label: string;
  }[];
  balance?: string;
}
export default function DepositInputs({
  form,
  tokenDepositSelects,
  balance,
}: Props) {
  return (
    <div className="flex justify-between rounded-md bg-primary p-3">
      <div>
        <FormField
          control={form.control}
          name="deposit"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  background="primary"
                  placeholder="0"
                  minLength={1}
                  textSize="xl"
                  step="any"
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
        <h2 className="pt-1 text-sm text-[#B6B6C9]">$22.55</h2>
      </div>
      <div>
        <Select
          form={form}
          items={tokenDepositSelects.map((e) => ({
            label: e.label,
            value: e.value.split(",")[0] ?? "",
            imageUrl: getLogoAsset(
              (e.value.split(",")[0] as `0x${string}`) ?? "0x",
            ),
          }))}
          title={""}
          name={"depositToken"}
        ></Select>
        {/* <Dropdown
          name="depositToken"
          colorScheme={"dark"}
          form={form}
          className="w-[150px]"
          disabled={tokenDepositSelects.length === 0}
          title="Deposit Token:"
        >
          {tokenDepositSelects.map((s) => {
            return (
              <SelectItem
                key={s.value}
                value={s.value.split(",")[0] ?? ""}
                className=" "
              >
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
        </Dropdown> */}
        <h2 className="pt-1 text-right text-sm text-[#B6B6C9]">
          Balance: {parseFloat(parseFloat(balance ?? "0").toFixed(6))}
        </h2>
        <BalancePercent
          balance={balance}
          setValue={(s: string) => {
            form.setValue("deposit", s);
          }}
        />
      </div>
    </div>
  );
}

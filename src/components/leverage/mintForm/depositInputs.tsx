import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TAddressString, TMintForm } from "@/lib/types";
import { BalancePercent } from "@/components/shared/balancePercent";
import Image from "next/image";

import { getLogoAsset } from "@/lib/utils";
interface Props {
  form: TMintForm;
  depositAsset: string | undefined;
  balance?: string;
}
export default function DepositInputs({ form, depositAsset, balance }: Props) {
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
        <h2 className="pb-2 text-sm">Deposit Asset:</h2>
        <div
          className={`flex items-center gap-x-2 rounded-md bg-secondary p-2 ${!depositAsset ? "opacity-70" : ""}`}
        >
          {!depositAsset && <div className="h-[25px] w-[25px]"></div>}
          {depositAsset && (
            <Image
              src={getLogoAsset(depositAsset?.split(",")[0] as TAddressString)}
              alt={depositAsset.split(",")[1] ?? ""}
              width={25}
              height={25}
            />
          )}
          <span>{depositAsset?.split(",")[1]}</span>
        </div>
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

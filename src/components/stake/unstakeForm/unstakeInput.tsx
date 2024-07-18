import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TUnstakeForm } from "@/lib/types";
import { BalancePercent } from "@/components/shared/balancePercent";

import sir_logo from "@/../public/images/sir-logo.svg";
import Image, { type StaticImageData } from "next/image";

interface Props {
  form: TUnstakeForm;
  balance?: string;
}

const UnstakeInput = ({ form, balance }: Props) => {
  const logo = sir_logo as StaticImageData;

  return (
    <div className="flex justify-between rounded-md bg-primary p-3">
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <div>
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
            <h2 className="pt-2 text-sm italic text-gray">{"$20.55"}</h2>
          </div>
        )}
      />
      <div className="flex flex-col items-end">
        <div
          className={`flex items-center justify-center gap-x-2 rounded-md py-1`}
        >
          <Image src={logo} alt="sir-logo" width={25} height={25} />
          <span className="font-medium">Staked SIR</span>
        </div>
        <h2 className="pt-1 text-right text-sm text-[#B6B6C9]">
          Balance: {parseFloat(parseFloat(balance ?? "0").toFixed(4))}
        </h2>
        <div className="flex justify-end"></div>
        <BalancePercent
          balance={balance}
          setValue={(s: string) => {
            form.setValue("amount", s);
          }}
        />
      </div>
    </div>
  );
};

export default UnstakeInput;

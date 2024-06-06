import Dropdown from "@/components/shared/dropDown";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import type { TMintForm } from "@/lib/types";
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
        </Dropdown>
        <h2 className="pt-1 text-right text-sm text-[#B6B6C9]">
          Balance: {parseFloat(parseFloat(balance ?? "0").toFixed(6))}
        </h2>
        <h2 className="pt-1 text-right text-sm text-[#26DEC8]">
          <span
            onClick={() =>
              form.setValue(
                "deposit",
                (parseFloat(balance ?? "0") / 4).toString(),
              )
            }
            aria-label="25% Balance"
            role="button"
          >
            25%
          </span>{" "}
          <span
            onClick={() =>
              form.setValue(
                "deposit",
                (parseFloat(balance ?? "0") / 2).toString(),
              )
            }
            aria-label="50% Balance"
            role="button"
          >
            50%
          </span>{" "}
          <span
            onClick={() =>
              form.setValue(
                "deposit",
                roundDown(parseFloat(balance ?? "0"), 4).toString(),
              )
            }
            role="button"
            aria-label="Max Balance"
          >
            Max
          </span>
        </h2>
      </div>
    </div>
  );
}

function roundDown(float: number, decimals: number) {
  let factor = Math.pow(10, decimals);
  let roundedDown = Math.floor(float * factor) / factor;
  return roundedDown;
}

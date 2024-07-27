import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import type { TUnstakeForm } from "@/lib/types";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  form: TUnstakeForm;
  dividends?: string;
}

const ClaimFeesCheckbox = ({ form, dividends }: Props) => {
  return (
    <FormField
      control={form.control}
      name="claimFees"
      render={({ field }) => (
        <FormItem className="mt-[20px]">
          <FormControl>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                ></Checkbox>
                <FormLabel className="text-lg font-medium">
                  Claim my fees
                </FormLabel>
              </div>
              <div className="text-[#B6B6C9] text-sm">
                Amount to claim: {dividends} ETH
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    ></FormField>
  );
};

export default ClaimFeesCheckbox;

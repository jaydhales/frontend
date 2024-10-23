import { FormLabel } from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  dividends?: string;
  value: boolean;
  onChange: (value: boolean) => void; // Add onChange prop
}

const ClaimFeesCheckbox = ({ dividends, value, onChange }: Props) => {
  console.log(dividends, "DIVIDENDS");
  if (!dividends) {
    return;
  }
  return (
    <div className="flex items-center justify-between pt-2">
      <div className="flex items-center gap-x-4">
        <Checkbox
          checked={value}
          onCheckedChange={(value) => {
            onChange(Boolean(value)); // Call onChange to update the state in UnstakeForm
          }}
        ></Checkbox>
        <FormLabel className="pt-2 text-lg font-medium">
          Claim my fees
        </FormLabel>
      </div>
      <div className="text-sm text-[#B6B6C9]">
        Amount to claim: {dividends} ETH
      </div>
    </div>
  );
};

export default ClaimFeesCheckbox;

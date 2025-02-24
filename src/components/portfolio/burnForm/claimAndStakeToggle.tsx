import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

interface Props {
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void; // Add onChange prop
}

export default function ClaimAndStakeToggle({
  value,
  disabled,
  onChange,
}: Props) {
  return (
    <Checkbox
      className="border border-white bg-secondary-600 focus:ring-2 focus:ring-white"
      checked={value}
      onCheckedChange={(checked) => {
        onChange(Boolean(checked)); // Call onChange to update the state in UnstakeForm
      }}
      disabled={disabled}
    ></Checkbox>
  );
}

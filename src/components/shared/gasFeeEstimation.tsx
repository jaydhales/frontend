import React from "react";
import { ChevronDown } from "lucide-react";

const GasFeeEstimation = () => {
  return (
    <div className="flex flex-row justify-between w-[85%] mt-5">
      <div className="text-sm text-gray">$20.55 in gas fee</div>
      <ChevronDown color="gray" size={20} strokeWidth={3} />
    </div>
  );
};

export default GasFeeEstimation;

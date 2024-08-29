import { Info } from "lucide-react";
import type { FC } from "react";
import React from "react";
interface TooltipsProps {
  children: React.ReactNode;
}

const ToolTip: FC<TooltipsProps> = ({ children }) => {
  return (
    <div className="flex relative">
      <div className="group ">
        <div className="h-12 z-[1000] hidden -left-[90px]  w-[200px] items-center bg-black p-3 rounded-md -top-14 absolute group-hover:flex">
          {children}
        </div>
        <div>
          <Info size={16} />
        </div>
      </div>
    </div>
  );
};

export default ToolTip;

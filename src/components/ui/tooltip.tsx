import { Info } from "lucide-react";
import type { FC } from "react";
import React from "react";
interface TooltipsProps {
  test: "test";
  children: React.ReactNode;
}

const ToolTip: FC<TooltipsProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="group relative">
        <div className="h-10 hidden items-center bg-black p-3 rounded-md -top-12 absolute group-hover:flex">
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

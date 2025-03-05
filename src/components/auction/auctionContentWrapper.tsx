import type { ReactNode } from "react";

const AuctionContentWrapper = ({
  header,
  children,
}: {
  header: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <h3 className="mb-8 h-[32px] text-center font-lora text-[32px] font-normal leading-[32px] text-white drop-shadow-md">
        {header}
      </h3>
      <div className="grid grid-cols-2 gap-8">{children}</div>
    </div>
  );
};

export default AuctionContentWrapper;

import React from "react";
import ImageWithFallback from "../shared/ImageWithFallback";
import { getLogoAsset, mapLeverage } from "@/lib/utils";
import type { TAddressString } from "@/lib/types";

export default function TransactionInfoCreateVault({
  leverageTier,
  longToken,
  versusToken,
}: {
  leverageTier: string;
  longToken: string;
  versusToken: string;
}) {
  return (
    <div className="py-3 ">
      <div className="flex justify-between">
        <div className=" flex flex-col items-center gap-y-1">
          <span className="text-[12px] text-gray-300">Long</span>
          <ImageWithFallback
            alt="Long Token"
            width={25}
            height={25}
            src={getLogoAsset(longToken as TAddressString)}
          />
        </div>
        <div className=" flex flex-col items-center gap-y-1">
          <span className="text-[12px] text-gray-300">Versus</span>
          <ImageWithFallback
            alt="Versus Token"
            width={25}
            height={25}
            src={getLogoAsset(versusToken as TAddressString)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="text-[12px] text-gray-300">Leverage</span>
          <span className="leading-0 text-center">
            {mapLeverage(leverageTier)}x
          </span>
        </div>
      </div>
    </div>
  );
}

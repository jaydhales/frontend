"use client";
import { formatSmallNumber } from "@/lib/utils";
import React, { useMemo } from "react";

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="rounded-md bg-black p-4">
        <DisplaySmallNumber num={0.00031} />
        <DisplaySmallNumber num={0.0000312222} />
        <DisplaySmallNumber num={0.000000512222} />
      </div>
    </div>
  );
}

function DisplaySmallNumber({ num }: { num: number }) {
  const dis = formatSmallNumber(num);
  console.log(num);
  const { sig, exp } = useMemo(() => {
    if (dis.includes("v")) {
      const split = dis.split("v")[1];
      if (!split) return { sig: "0", exp: 0 };
      return { sig: split.slice(1, split.length), exp: split[0] };
    }
    return { sig: "0", exp: 0 };
  }, [dis]);

  return (
    <div className="flex gap-x-4 text-white">
      <div>{num}</div>
      <div>
        0.0
        <sub className="text-[11px]">+{exp}</sub>
        {sig}
      </div>
    </div>
  );
}

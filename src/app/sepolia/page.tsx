"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { MethContract } from "@/contracts/meth";
import React from "react";
import { useSimulateContract, useWriteContract } from "wagmi";

export default function Page() {
  const { data: MethData } = useSimulateContract({
    ...MethContract,
    functionName: "mint",
  });
  const { data: TarpData } = useSimulateContract({
    ...MethContract,
    functionName: "mint",
  });
  const { writeContract } = useWriteContract();
  const onSubmitMeth = () => {
    if (MethData) {
      writeContract(MethData?.request);
    }
  };

  console.log(TarpData, MethData);
  const onSubmitTarp = () => {
    if (TarpData) {
      writeContract(TarpData?.request);
    }
  };
  return (
    <Container className="pt-[44px]">
      <Card className="flex flex-col items-center justify-center p-4 text-white">
        <h1 className="mb-6 text-2xl  ">Sepolia Utilities</h1>

        <div className="flex gap-x-3 text-blue-300">
          <a
            href="https://www.infura.io/faucet/sepolia"
            target="_blank"
            className="rounded px-4 py-2"
          >
            Mint ETH
          </a>
          <a
            href="https://faucets.chain.link/sepolia"
            target="_blank"
            className="rounded  px-4 py-2"
          >
            Mint LINK
          </a>
          <a
            href="https://faucet.circle.com/"
            target="_blank"
            className="rounded  px-4 py-2"
          >
            Mint USDC
          </a>
        </div>

        <div className="mt-8 w-full max-w-md rounded-lg bg-secondary-400 bg-opacity-40 p-6 shadow-md ">
          <h2 className="mb-4 text-xl text-gray-300">Mock Tokens</h2>
          <div className="flex gap-x-4">
            <div className="">
              <Button
                disabled={!MethData}
                onClick={() => {
                  onSubmitMeth();
                }}
                className="mt-2 rounded  px-4 py-2  "
              >
                Mint 1000 METH
              </Button>
            </div>

            <div className="mb-4">
              <Button
                disabled={!TarpData}
                onClick={() => {
                  onSubmitTarp();
                }}
                className="mt-2 rounded  px-4 py-2  "
              >
                Mint 1000 TARP
              </Button>
            </div>
          </div>
        </div>

        <a
          href="https://interface-jet.vercel.app/#/swap?chain=sepolia"
          target="_blank"
          className="mt-8 rounded bg-gold px-4 py-2 text-black  hover:bg-gold/95"
        >
          Trade on Sepolia Uniswap
        </a>
      </Card>
    </Container>
  );
}

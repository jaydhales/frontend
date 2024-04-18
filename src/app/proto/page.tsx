"use client";
import { MintOrBurnForm } from "@/components/proto/forms/mintOrBurnForm";
import { UniswapForm } from "@/components/proto/forms/uniswapForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function page() {
  return (
    <div className=" flex justify-center  pt-20">
      <Tabs defaultValue="swapMint" className="w-1/2">
        <TabsList className="">
          <TabsTrigger value="swapMint">Swap & Mint</TabsTrigger>
          <TabsTrigger value="uniswap">Uniswap</TabsTrigger>
        </TabsList>
        <TabsContent value="swapMint">
          <MintOrBurnForm />
        </TabsContent>
        <TabsContent value="uniswap">
          <UniswapForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

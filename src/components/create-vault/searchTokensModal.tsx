import React, { useMemo } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import type { TToken } from "@/contexts/tokenListProvider";
import { useTokenlistContext } from "@/contexts/tokenListProvider";
import type { Address } from "viem";
import SearchInput from "./searchInput";
import ImageWithFallback from "../shared/ImageWithFallback";
import { getLogoAsset } from "@/lib/assets";
import { useFormContext } from "react-hook-form";
import type { CreateVaultInputValues } from "@/lib/schemas";
import type { z } from "zod";

export default function SearchTokensModal({
  open,
  onOpen,
  selectedTokens,
  tokenSelection,
}: {
  open?: boolean;
  onOpen?: (b: boolean) => void;
  tokenSelection: "longToken" | "versusToken" | undefined;
  selectedTokens: `0x${string}`[];
}) {
  const { setValue } = useFormContext<z.infer<typeof CreateVaultInputValues>>();
  const { tokenlist } = useTokenlistContext();
  const [searchQuery, setSearchQuery] = React.useState("");
  const tokens = useMemo(() => {
    return tokenlist?.filter((token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, tokenlist]);
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent
        title="Search Tokens"
        className="w-[440px] overflow-hidden border-none bg-secondary-900 p-0 text-white"
      >
        <DialogClose></DialogClose>
        <div className="relative  h-[80vh] space-y-6 pt-4 text-white">
          <div className="space-y-2 px-6">
            <DialogTitle className="text-center font-lora text-[28px]">
              Select a token
            </DialogTitle>
            {/* <h1 className="font-geistMono">Select a token</h1> */}
            <div className="">
              <SearchInput setValue={setSearchQuery} value={searchQuery} />
              <div className="pt-2 text-sm">
                <span className="text-gray-500">
                  Can&apos;t find token? Enter the token{" "}
                </span>
                <button className="text-blue-400 underline">here.</button>
              </div>
            </div>
          </div>
          <div className="relative z-0 h-[calc(100%-210px)] border-t border-secondary-600  ">
            <h2 className="font-geistMono py-3 pl-6 text-[14px] text-[#999999]">
              Tokens ({tokens?.length})
            </h2>
            <div className=" scrollbar h-[calc(100%-22px)] space-y-2 overflow-y-auto px-2 pb-2">
              {tokens
                ?.filter(
                  (token) => !selectedTokens.includes(token.address as Address),
                )
                .map((token) => {
                  return (
                    <TokenItem
                      token={token}
                      selectToken={(token) => {
                        setValue(tokenSelection ?? "longToken", token.address);
                        if (onOpen) onOpen(false);
                      }}
                      key={token.address}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TokenItem({
  token,
  selectToken,
}: {
  token: TToken;
  selectToken: (token: TToken) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        selectToken(token);
      }}
      className="mb-2 flex w-full justify-between rounded-md bg-secondary-500 px-4 py-2 text-left transition-colors hover:bg-secondary-400"
    >
      <div className="flex items-center gap-x-2">
        <ImageWithFallback
          className="h-10 w-10 rounded-full"
          src={getLogoAsset(token.address as Address, "1")}
          width={40}
          height={40}
          alt=""
        />
        <div>
          <div>
            <span>{token.symbol}</span>
          </div>
          <div>
            <span className="text-sm text-gray-400">{token.name}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

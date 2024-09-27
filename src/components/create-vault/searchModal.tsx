import React from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { api } from "@/trpc/react";
import { Input } from "../ui/input";
import { useState } from "react";
import ImageWithFallback from "../shared/ImageWithFallback";
import { getLogoAsset } from "@/lib/utils";
import type { TAddressString } from "@/lib/types";
import { useDebounce } from "../shared/hooks/useDebounce";
export default function SearchModal({
  setSearchTokensOpen,
  searchTokensOpen,
}: {
  setSearchTokensOpen: (b: boolean) => void;
  searchTokensOpen: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermDebounced = useDebounce(searchTerm, 400);
  const data = api.tokens.searchTokens.useQuery(
    { searchTerm: searchTermDebounced },
    { enabled: searchTokensOpen && Boolean(searchTerm) },
  );
  console.log(data.data);
  return (
    <AlertDialog open={searchTokensOpen} onOpenChange={setSearchTokensOpen}>
      <AlertDialogContent
        onTop={true}
        title="Mint Modal"
        align="center"
        animate="none"
        closeColor={"black"}
        className="bg-transparent z-[400]"
      >
        <div
          className={`rounded-xl p-8 relative transition-all duration-700  bg-secondary text-white`}
        >
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="bg-secondary-200 rounded-md"
          />
          <div className="h-40 overflow-y-auto space-y-3">
            {data?.data?.map((row) => {
              return (
                <div className="flex  justify-between" key={row.ID}>
                  <span>{row.Symbol}</span>{" "}
                  <ImageWithFallback
                    src={getLogoAsset(row.Address as TAddressString)}
                    alt="collateral"
                    width={40}
                    height={40}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

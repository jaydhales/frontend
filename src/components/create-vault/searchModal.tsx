import React, { useMemo } from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { api } from "@/trpc/react";
import { Input } from "../ui/input";
import { useState } from "react";
import ImageWithFallback from "../shared/ImageWithFallback";
import { getLogoAsset } from "@/lib/utils";
import type { TAddressString } from "@/lib/types";
import { useDebounce } from "../shared/hooks/useDebounce";
interface TRow {
  ID: number;
  Address: string;
  Decimals: number;
  Name: string;
  Symbol: string;
}
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
  const { found, match } = useMemo(() => {
    let match: TRow[] = [];
    const found = data.data?.filter((row) => {
      console.log(row);
      if (
        row.Symbol.toLowerCase() !== searchTerm.toLowerCase() &&
        row.Name.toLowerCase() !== searchTerm.toLowerCase()
      ) {
        return true;
      } else {
        if (!match) {
          match = [row];
        } else {
          match.push(row);
        }
        return false;
      }
    });
    console.log({ found, match }, "HELLLO");
    return { found, match: match ?? [] };
  }, [data.data, searchTerm]);
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
          className={`rounded-xl w-[500px] p-8 relative transition-all duration-700  bg-secondary text-white`}
        >
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="bg-secondary-200 rounded-md"
          />
          <div className="pt-3"></div>
          <div className="h-[600px] overflow-y-auto space-y-3">
            {match?.map((row) => {
              return <Row key={row.ID} {...row} />;
            })}
            {found?.map((row) => {
              return <Row key={row.ID} {...row} />;
            })}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Row(row: TRow) {
  return (
    <div
      className="flex w-full items-center px-2 gap-x-4 rounded-md cursor-pointer hover:bg-secondary-300 justify-between"
      key={row.ID}
    >
      <div className="space-x-2">
        <span className="text-wrap">{row.Name}</span>
        <span className="text-[12px] text-gray-400">{row.Symbol}</span>
      </div>
      <ImageWithFallback
        src={getLogoAsset(row.Address as TAddressString)}
        alt="collateral"
        width={40}
        height={40}
      />
    </div>
  );
}

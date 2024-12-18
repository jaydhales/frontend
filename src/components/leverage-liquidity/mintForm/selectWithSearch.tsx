import Select from "@/components/shared/Select";
import { useDebounce } from "@/components/shared/hooks/useDebounce";
import { getLogoAsset } from "@/lib/assets";
import type { TMintForm } from "@/lib/types";
import { api } from "@/trpc/react";
import type { StaticImageData } from "next/image";
import React, { useState } from "react";

type TItem = {
  value: string;
  label: string;
  imageUrl?: string | StaticImageData;
};
interface Props {
  items: TItem[];
  form: TMintForm;
  name: "leverageTier" | "long" | "versus" | "depositToken";
  title: string;
}
export default function SelectWithSearch({ form, name, title, items }: Props) {
  const type = name === "long" ? "collateral" : "debt";
  const [input, setInput] = useState("");
  const deInput = useDebounce(input, 300);
  const { data } = api.vault.getSearchVaults.useQuery(
    {
      search: deInput.toUpperCase(),
      type,
    },
    {
      enabled: Boolean(deInput),
    },
  );
  console.log(data, "data");
  let searchItems: TItem[] | undefined = [
    ...new Map(
      data?.vaults?.map((item) => [
        item[type === "debt" ? "debtToken" : "collateralToken"],
        item,
      ]),
    ).values(),
  ].map((e) => {
    if (type === "collateral") {
      return {
        label: e.collateralSymbol,
        value: e.collateralToken + "," + e.collateralSymbol,
        imageUrl: getLogoAsset(e.collateralToken as `0x${string}`),
      };
    } else {
      return {
        label: e.debtSymbol,
        value: e.debtToken + "," + e.debtSymbol,
        imageUrl: getLogoAsset(e.debtToken as `0x${string}`),
      };
    }
  });
  if (input === "") {
    searchItems = undefined;
  }
  return (
    <Select
      searchItems={searchItems}
      title={title}
      onChangeInput={(s) => {
        setInput(s);
      }}
      items={items}
      name={name}
      form={form}
      value={input}
    />
  );
}

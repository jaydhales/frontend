import { formatBigInt, getAssetInfo, getLogoAsset } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
export function SectionTwo({
  bg,
  data,
  amount,
}: {
  bg: string;
  amount: bigint | undefined;
  data:
    | {
        leverageTier: number | undefined;
        debtToken: `0x${string}` | undefined;
        collateralToken: `0x${string}` | undefined;
      }
    | undefined;
}) {
  const { data: assetData } = useQuery({
    queryFn: () => getAssetInfo(data?.collateralToken),
    queryKey: [data?.collateralToken],
  });

  return (
    <div className={`w-full  rounded-md ${bg} `}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-[28px]">{formatBigInt(amount, 4)}</h2>
        </div>
        <div>
          <div className={"flex  gap-x-2 "}>
            <div className="flex h-[45px] w-[140px] items-center gap-x-2 rounded-md bg-primary px-2">
              <Image
                src={getLogoAsset(data?.collateralToken)}
                alt="collateral"
                width={28}
                height={28}
              />
              <h3>{assetData?.success ? assetData?.data?.symbol : "?"}</h3>
            </div>

            {/* KEEP FOR FUTURE */}
            {/* <div className="flex-grow">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className="h-[45px] w-[140px] "
                          colorScheme="light"
                        >
                          <SelectValue placeholder={"Select token"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.collateralToken && (
                          <SelectItem value={data.collateralToken}>
                            Collateral
                          </SelectItem>
                        )}
                        {data?.debtToken && (
                          <SelectItem value={data.debtToken}>Debt</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between pt-1">
        <span className="text-sm font-medium text-gray">$22.44</span>
        {/* <span className="text-sm italic text-gray">Balance $232.23</span> */}
      </div>
    </div>
  );
}

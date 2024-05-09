import { type UseFormReturn } from "react-hook-form";

export interface TMintFormFields {
  long: string;
  versus: string;
  leverageTier: string;
  depositToken: string;
  deposit: number;
}
export type TMintForm = UseFormReturn<
  {
    long: string;
    versus: string;
    leverageTier: string;
    depositToken: string;
    deposit: number;
  },
  undefined
>;

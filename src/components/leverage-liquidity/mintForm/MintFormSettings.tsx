import { Settings } from "lucide-react";
import React from "react";
import useIsDebtToken from "./hooks/useIsDebtToken";
export default function MintFormSettings() {
  const isDebt = useIsDebtToken();
  if (!isDebt) return;
  return (
    <div className="flex items-center">
      <button type="button">
        <Settings className="h-4 w-4 " />
      </button>
    </div>
  );
}

// <FormField
//   control={form.control}
//   name="slippage"
//   render={({ field }) => (
//     <FormItem>
//       <FormControl>
//         <Input
//           type="text"
//           height="sm"
//           className="w-full bg-transparent  px-1 text-[12px]"
//           inputMode="decimal"
//           autoComplete="off"
//           pattern="^[0-9]*[.,]?[0-9]*$"
//           background="primary"
//           placeholder="0"
//           {...field}
//           onChange={(e) => {
//             if (inputPatternMatch(e.target.value, decimals)) {
//               return field.onChange(e.target.value);
//             }
//           }}
//         />
//       </FormControl>
//     </FormItem>

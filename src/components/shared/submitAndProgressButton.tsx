import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { ESubmitType } from "../leverage-liquidity/mintForm/hooks/useCheckSubmitValid";
interface Props {
  waitForSign: boolean;
  isTxPending: boolean;
  isTxSuccess: boolean;
  submitType: ESubmitType;
  isValid: boolean;
}
export default function SubmitAndProgressButton({
  waitForSign,
  isTxPending,
  isTxSuccess,
  submitType,
  isValid,
}: Props) {
  const data = useMemo(() => {
    if (isTxSuccess) {
      return { message: "Success!", success: true };
    }
    if (waitForSign) {
      return { message: "Please Sign Transaction." };
    }
    if (isTxPending) {
      return { message: "Pending..." };
    }
    return {};
  }, [waitForSign, isTxPending, isTxSuccess]);
  return (
    <div>
      <Button disabled={!isValid} variant={"submit"} type="submit">
        {data?.message ? (
          data.message
        ) : (
          <> {submitType === ESubmitType.mint ? "Mint" : "Approve"}</>
        )}
      </Button>
    </div>
  );
}

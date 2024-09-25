import { formatUnits, type SimulateContractReturnType } from "viem";
import { useClaim } from "../stake/hooks/useClaim";
import UnstakeForm from "../stake/unstakeForm/unstakeForm";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import TransactionModal from "../shared/transactionModal";
import { useGetStakedSir } from "../shared/hooks/useGetStakedSir";
interface Props {
  open: boolean;
  setOpen: (b: boolean) => void;
}
export function UnstakeModal({ open, setOpen }: Props) {
  type SimulateReq = SimulateContractReturnType["request"] | undefined;
  const { Claim, isFetching: claimFetching } = useClaim();

  const stakedSir = useGetStakedSir();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        title="Mint Modal"
        align="center"
        animate="none"
        closeColor={"black"}
        className="bg-transparent"
      >
        <div
          className={`rounded-xl relative transition-all duration-700  bg-secondary-800 text-white`}
        >
          <TransactionModal.Close setOpen={setOpen} />
          <h1 className="font-lora text-2xl text-center pt-4">Unstake</h1>
          <UnstakeForm
            balance={stakedSir}
            claimSimulate={Claim?.request as SimulateReq}
            claimResult={Claim?.result}
            claimFetching={claimFetching}
          ></UnstakeForm>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { formatUnits, type SimulateContractReturnType } from "viem";
import { useClaim } from "../stake/hooks/useClaim";
import UnstakeForm from "../stake/unstakeForm/unstakeForm";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import TransactionModal from "./transactionModal";
import { useGetStakedSir } from "./hooks/useGetStakedSir";
import StakeForm from "../stake/stakeForm/stakeForm";
interface Props {
  open: boolean;
  setOpen: (b: boolean) => void;
}
export function StakeModal({ open, setOpen }: Props) {
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
          className={`relative rounded-xl bg-secondary-600 text-white  transition-all duration-700`}
        >
          <TransactionModal.Close setOpen={setOpen} />
          <h1 className="pt-4 text-center font-lora text-2xl">Stake</h1>
          <StakeForm></StakeForm>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

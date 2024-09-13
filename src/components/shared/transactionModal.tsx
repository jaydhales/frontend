import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/ui/tooltip";
import { X } from "lucide-react";
import type { ReactNode } from "react";
interface Props {
  setOpen: (b: boolean) => void;
  open: boolean;
  children: React.ReactNode;
}
function Root({ open, setOpen, children }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        onTop={true}
        title="Mint Modal"
        align="center"
        animate="none"
        closeColor={"black"}
        className="bg-transparent z-[400]"
      >
        <div
          className={`rounded-xl relative transition-all duration-700  bg-secondary text-white`}
        >
          {children}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
const StatContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col w-full py-2 gap-y-1">{children}</div>
);
function StatSubmitContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex py-4 px-6 w-full flex-col gap-y-4 items-center">
      {children}
    </div>
  );
}

function InfoContainer({ children }: { children: ReactNode }) {
  return (
    <div className="px-6 rounded-tr-xl rounded-tl-xl bg-black/15 pt-5 pb-6">
      {children}
    </div>
  );
}

function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="text-[12px] italic text-gray-400 items-center pt-2 w-[300px]">
      <span>{children}</span>
    </div>
  );
}
function Close({ setOpen }: { setOpen: (b: boolean) => void }) {
  return (
    <div className="absolute right-3 top-3">
      <X
        className="cursor-pointer"
        size={20}
        onClick={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
function StatRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex  justify-between relative text-[13px]">
      <h3 className="text-gray-300 ">
        <span className="flex z-20 items-center gap-x-1">
          {title} <ToolTip>Fee Info</ToolTip>
        </span>
      </h3>
      <h4>{value}</h4>
    </div>
  );
}

function SubmitButton({
  onClick,
  disabled,
  children,
  loading,
}: {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
  loading: boolean;
}) {
  return (
    <Button
      className="text-[16px]"
      onClick={onClick}
      disabled={disabled}
      variant="modal"
      state={loading ? "loading" : "default"}
      type="submit"
    >
      {children}
    </Button>
  );
}
const TransactionModal = {
  Root,
  InfoContainer,
  Close,
  StatRow,
  StatSubmitContainer,
  StatContainer,
  Disclaimer,
  SubmitButton,
};
export default TransactionModal;

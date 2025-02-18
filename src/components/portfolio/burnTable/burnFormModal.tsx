import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  // setOpen: (b: boolean) => void;
  children: React.ReactNode;
}
export function BurnFormModal({ children }: Props) {
  return (
    <Dialog open={true}>
      <DialogContent title="Mint Modal" className="bg-transparent">
        <div
          className={`relative rounded-xl bg-secondary-800 p-6 text-white  transition-all duration-700`}
        >
          {/* <TransactionModal.Close setOpen={setOpen} /> */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

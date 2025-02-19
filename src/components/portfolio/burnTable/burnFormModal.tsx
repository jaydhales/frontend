import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  reset: () => void;
  children: React.ReactNode;
}
export function BurnFormModal({ reset, children }: Props) {
  return (
    <Dialog open={true} onOpenChange={() => reset()}>
      <DialogContent title="Mint Modal" className="bg-transparent">
        <div
          className={`relative rounded-xl border border-secondary-700 bg-secondary-800 px-4 py-2 text-white  transition-all duration-700`}
        >
          {/* <TransactionModal.Close setOpen={setOpen} /> */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

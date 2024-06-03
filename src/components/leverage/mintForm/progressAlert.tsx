import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
}
export default function ProgressAlert({ setOpen, open }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        align="center"
        animate="none"
        closeColor={"black"}
        className=" overflow-hidden"
      >
        <div></div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

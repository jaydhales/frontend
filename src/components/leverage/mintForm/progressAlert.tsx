import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
interface Props {
  open: boolean;
}
export default function ProgressAlert({ open }: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        align="center"
        animate="none"
        closeColor={"black"}
        className=" overflow-hidden bg-transparent"
      >
        <div className="rounded-md bg-secondary p-8 text-white">
          <h1>Processing transaction...</h1>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { X } from "lucide-react";

export default function CloseModalButton({ close }: { close: () => void }) {
  return (
    <div className="absolute right-3 top-3">
      <X
        className="cursor-pointer"
        size={20}
        onClick={() => {
          close();
        }}
      />
    </div>
  );
}

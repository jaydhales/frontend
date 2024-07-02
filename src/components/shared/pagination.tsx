import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function Pagination() {
  const searchParams = useSearchParams();
  const pagination = searchParams.get("pagination");
  let number = pagination ? parseInt(pagination) : 1;
  if (!isFinite(number)) {
    // check if pagination is a number
    number = 1;
  }

  return (
    <div className="flex justify-end gap-x-3 items-center pt-4">
      <div className="flex gap-x-3 items-center">
        <Link href="/" scroll={false}>
          <button
            disabled={number === 1}
            aria-label="Left"
            className="rounded-full disabled:opacity-50 p-2 bg-primary"
          >
            <ChevronLeft size={17} />
          </button>
        </Link>
        <div className="px-3 h-[33px] items-center flex rounded-lg text-[14px] bg-primary">
          1
        </div>
        <span className="opacity-80">of</span>
        <div className="px-3 h-[33px] items-center flex text-[14px] rounded-lg bg-primary">
          1
        </div>
        <Link href="/" scroll={false}>
          <button
            role="link"
            aria-label="Scroll Vaults Right"
            disabled={true}
            className="rounded-full disabled:opacity-50 p-2 bg-primary"
          >
            <ChevronRight size={17} />
          </button>
        </Link>
      </div>
    </div>
  );
}

import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function Pagination({ max }: { max: number }) {
  if (max < 1) {
    max = 1;
  }
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
            className="rounded-full disabled:opacity-50 p-[5px] bg-primary"
          >
            <ChevronLeft size={17} />
          </button>
        </Link>
        <div className="px-3 h-[25px] items-center flex rounded-lg text-[15px] bg-primary">
          1
        </div>
        <span className="opacity-80">of</span>{" "}
        <div className="px-3 h-[25px] items-center flex text-[15px] rounded-lg bg-primary">
          {max}
        </div>
        <Link href="/" scroll={false}>
          <button
            role="link"
            aria-label="Scroll Vaults Right"
            disabled={number >= max}
            className="rounded-full disabled:opacity-50 p-[5px] bg-primary"
          >
            <ChevronRight size={17} />
          </button>
        </Link>
      </div>
    </div>
  );
}

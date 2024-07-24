import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function Pagination({ max }: { max: page }) {
  if (max < 1) {
    max = 1;
  }
  console.log(max, "MAX");
  const searchParams = useSearchParams();
  const pagination = searchParams.get("vault-page");
  let page = pagination ? parseInt(pagination) : 1;
  if (!isFinite(page)) {
    // check if pagination is a page
    page = 1;
  }
  return (
    <div className="flex justify-end gap-x-3 items-center pt-4">
      <div className="flex gap-x-3 items-center">
        <Link href={"?vault-page=" + (page - 1)} scroll={false}>
          <button
            disabled={page === 1}
            aria-label="Left"
            className="rounded-full disabled:opacity-50 p-[5px] bg-primary"
          >
            <ChevronLeft size={17} />
          </button>
        </Link>
        <div className="px-3 h-[25px] items-center flex rounded-lg text-[15px] bg-primary">
          {page}
        </div>
        <span className="opacity-80">of</span>{" "}
        <div className="px-3 h-[25px] items-center flex text-[15px] rounded-lg bg-primary">
          {max}
        </div>
        <Link href={"?vault-page=" + (page + 1)} scroll={false}>
          <button
            role="link"
            aria-label="Scroll Vaults Right"
            disabled={page >= max}
            className="rounded-full disabled:opacity-50 p-[5px] bg-primary"
          >
            <ChevronRight size={17} />
          </button>
        </Link>
      </div>
    </div>
  );
}

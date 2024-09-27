import { useMemo } from "react";
interface Props {
  apeLength: number | undefined;
  teaLength: number | undefined;
  filter: "ape" | "tea" | "all";
}
export default function useCheckUserHasPositions({
  apeLength,
  teaLength,
  filter,
}: Props) {
  const hasPositions = useMemo(() => {
    const aLength = apeLength ?? 0;
    const tLength = teaLength ?? 0;
    if (filter === "ape") {
      if (aLength > 0) {
        return true;
      } else {
        return false;
      }
    } else if (filter === "tea") {
      if (tLength > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (aLength > 0 || tLength > 0) {
        return true;
      } else {
        return false;
      }
    }
  }, [filter, apeLength, teaLength]);
  return hasPositions;
}

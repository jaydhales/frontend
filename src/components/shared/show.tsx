import React from "react";
import { fallback } from "viem";
export default function Show({
  when,
  children,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  when: boolean;
}) {
  if (when) {
    return <>{children}</>;
  } else {
    if (fallback) {
      return <>{fallback}</>;
    }
    return undefined;
  }
}

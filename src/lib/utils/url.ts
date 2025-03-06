import { headers } from "next/headers";

export function getUrl() {
  const list = headers();
  const scheme = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = list.get("host");
  return { scheme, host };
}

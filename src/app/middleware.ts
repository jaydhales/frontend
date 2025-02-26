// Endpoint Used:
//
// https://app.sir.trading/create-vault
//
// Add a Global Throttling Middleware (Prevent Multiplexed HTTP/2 Spam)
//  Use Next.js Middleware to block excessive requests to /create-vault.
//
// ➤ Middleware Code (pages/_middleware.js or app/middleware.ts)

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const RATE_LIMIT = 5; // Max 5 requests per 10 seconds
const WINDOW_MS = 10000; // Time window in milliseconds
const rateLimit = new Map<string, number[]>();

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname === "/create-vault" ||
    req.nextUrl.pathname.includes("/api")
  ) {
    const ip = req.headers.get("x-forwarded-for") ?? req.ip;
    if (!ip) {
      return new NextResponse("No IP Provided", { status: 429 });
    }
    const now = Date.now();
    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, []);
    }
    const timestamps = rateLimit.get(ip);
    if (!timestamps)
      return new NextResponse("Something went wrong.", { status: 429 });
    const filteredTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < WINDOW_MS,
    );
    filteredTimestamps.push(now);

    rateLimit.set(ip, filteredTimestamps);

    if (filteredTimestamps.length > RATE_LIMIT) {
      return new NextResponse("Too many requests", { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-vault", "/api/:path*"], // Apply only to this page
};
//
// - Limits HTTP/2 stream spam to /create-vault
// - Blocks excessive requests with 429 Too Many Requests
// - Applies to Vercel Edge Middleware (efficient & fast)

// Prevent HTTP/2 Connection Overuse
//
// By default, browsers can keep persistent HTTP/2 connections open, which can lead to resource exhaustion. Prevent this by closing idle connections.
//
// ➤ Modify Headers in next.config.js

module.exports = {
  async headers() {
    return [
      {
        source: "/create-vault",
        headers: [
          { key: "Connection", value: "close" }, // Prevents long-lived HTTP/2 connections
          { key: "Keep-Alive", value: "timeout=5, max=10" }, // Limits keep-alive time
          { key: "X-Frame-Options", value: "DENY" }, // Blocks iframe exploits
        ],
      },
    ];
  },
};

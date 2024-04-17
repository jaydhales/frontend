import "../styles/globals.css";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import { TRPCReactProvider } from "~/trpc/react";
import EvmProvider from "~/components/providers/evm-provider";
import { headers } from "next/headers";
import { Header } from "~/components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sir",
  description: "Sir frontend",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = headers().get("cookie");
  const headerList = headers();
  const country = headerList.get("x-country");
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <EvmProvider cookie={cookie}>
            <Header />
            {children}
          </EvmProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

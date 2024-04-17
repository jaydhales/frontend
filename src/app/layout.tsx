import "../styles/globals.css";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import { TRPCReactProvider } from "~/trpc/react";
import EvmProvider from "~/components/providers/evm-provider";

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
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <EvmProvider>{children}</EvmProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

import "../styles/globals.css";
import "@radix-ui/themes/styles.css";
import { TRPCReactProvider } from "@/trpc/react";
import EvmProvider from "@/components/providers/evmProvider";
import { headers } from "next/headers";
import { Header } from "@/components/header";
import { Inter, Lora } from "next/font/google";
import Footer from "@/components/footer";

const inter = Inter({
        subsets: ["latin"],
        variable: "--font-sans",
});
const lora = Lora({
        subsets: ["latin"],
        variable: "--font-lora",
});
// console.log(Inter, "INTER");
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
        // const headerList = headers();
        // const country = headerList.get("x-country");
        return (
                <html lang="en">
                        <body className={`bg-background ${lora.variable} ${inter.className} `}>
                                <TRPCReactProvider>
                                        <EvmProvider cookie={cookie}>
                                                <div className="flex min-h-screen flex-col">
                                                        <Header />
                                                        {children}
                                                        <Footer />
                                                </div>
                                        </EvmProvider>
                                </TRPCReactProvider>
                        </body>
                </html>
        );
}

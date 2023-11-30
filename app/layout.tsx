import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CoinContextProvider } from "@/context/CoinContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoHub",
  description: "Created by @blurridge | @EAChowfan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <CoinContextProvider>
            <ThemeContextProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeContextProvider>
          </CoinContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

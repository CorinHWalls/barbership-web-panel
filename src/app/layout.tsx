import { TempoInit } from "@/components/tempo-init";
import { AuthProvider } from "@/components/auth/AuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbershop Management System",
  description: "Professional barbershop management and kiosk system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <TempoInit />
      </body>
    </html>
  );
}

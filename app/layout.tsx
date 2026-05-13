import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { ReownAppKitProvider } from "@/components/reown-appkit-provider";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
}); 




export const metadata: Metadata = {
  title: "Mosaic Africa",
  description: "Blockchain Credit Scoring System",
};

import { AuthProvider } from "@/components/auth-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const cookies = headerStore.get("cookie");

  return (
    <html lang="en">
      <body
        className={` ${nunitoSans.className} dark font-sans antialiased`}
      >
        <ReownAppKitProvider cookies={cookies}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReownAppKitProvider>
      </body>
    </html>
  );
}

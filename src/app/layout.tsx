import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Intranet",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        
      <body className={inter.className}>
        <div className="z-[9999]"><Toaster position="top-center"/></div>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import Head from "next/head";
import { Outfit } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

import { metadata } from "./metadata";
import { Toaster } from "@/components/ui/sonner";
import { UpdateCardContext } from "./_context/UpdateCardContext";
import Header from "./_components/Header";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = usePathname();
  const [updateCard, setUpdateCard] = useState(false);

  const showHeader =
    params == "/sign-in" || params == "/create-account" ? false : true;

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={outfit.className}>
        <UpdateCardContext.Provider value={{ updateCard, setUpdateCard }}>
          {showHeader && <Header />}
          {children}
          <Toaster />
        </UpdateCardContext.Provider>
      </body>
    </html>
  );
}

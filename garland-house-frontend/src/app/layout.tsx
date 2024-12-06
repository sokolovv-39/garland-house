"use client";

import type { Metadata } from "next";
import "@/styles/global.scss";
import { manrope } from "@/fonts/fonts";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IndexedDBProvider } from "@/fsd/shared";
import { useEffect } from "react";
import Modal from "react-modal";

/* export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}; */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon192.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <NextTopLoader color="#C59B68" />
        <IndexedDBProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </IndexedDBProvider>
      </body>
    </html>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Script from "next/script";
import { bizUdpGothic } from "./fonts";
export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app"
};
export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="ja" data-oid="cch85h." className={bizUdpGothic.variable}>
      <body
        className={`font-sans ${bizUdpGothic.className}`}
        data-oid="p.xa-v9">

        <Suspense
          fallback={<div data-oid="w8qub5z">Loading...</div>}
          data-oid="ep6h8cv">

          {children}
        </Suspense>

        <Script
          src="https://cdn.jsdelivr.net/gh/onlook-dev/onlook@main/apps/web/client/public/onlook-preload-script.js"
          strategy="afterInteractive"
          type="module"
          id="https://cdn.jsdelivr.net/gh/onlook-dev/onlook@main/apps/web/client/public/onlook-preload-script.js"
          data-oid=".k378.n">
        </Script>
      </body>
    </html>);

}
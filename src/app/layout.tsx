"use client";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/header/navigation";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Sabillussalam</title>
        <link
          rel="shortcut icon"
          href="/icons/app/32-logo.png"
          type="image/x-icon"
        />
        <link rel="manifest" href="/pwa/manifest.webmanifest" />
      </head>
      <body className={`${poppins.className} bg-[#FAFAFA]`}>
        {pathname === "/login" || pathname.slice(0, 4) === "/pwa" ? (
          ""
        ) : (
          <Navigation />
        )}
        {children}
      </body>
    </html>
  );
}

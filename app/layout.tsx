import type { Metadata } from "next";
import "./globals.css";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { Toaster } from "react-hot-toast";
import getSeo from "@/lib/getSeo";

import ConditionalLayout from "./components/ConditionalLayout";

import { Kaushan_Script } from "next/font/google";
import { Rajdhani, DM_Sans } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan",
});

export async function generateMetadata(): Promise<Metadata> {

  const seo: any =
    await getSeo("home");

  return {
    title:
      seo?.metaTitle ||
      "Kings Truck Center",

    description:
      seo?.metaDescription || "",

    keywords:
      seo?.metaKeywords || "",
  };

}

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${dmsans.variable} ${kaushan.variable}`}
      >
        <Toaster
          position="top-right"
          containerStyle={{
            top: 20,
            right: 20,
            zIndex: 999999999,
          }}
          toastOptions={{
            duration: 4000,
          }}
        />

        {/* ✅ THIS controls admin vs public UI */}
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
import { Toaster } from "@/components/ui/sonner";
import { allura, nanumMyeongjo } from "@/lib/fonts";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: {
    default: "Andy's Gown Rental",
    template: "%s | Andy's Gown Rental",
  },
  description:
    "Discover elegant gowns for weddings, proms, and every special occasion.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nanumMyeongjo.variable} ${allura.variable} antialiased text-site-text bg-site-background flex flex-col min-h-dvh`}
      >
        <main className="font-body grow flex flex-col">
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

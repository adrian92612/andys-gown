"use client";

import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";
import { useIsOnDashboard } from "@/lib/hooks/useIsOnDashboard";
import Image from "next/image";
import { images } from "@/constants/images";

export const Header = () => {
  const { isOnDashboard } = useIsOnDashboard();

  return (
    <header
      className={cn(
        "w-full h-14 bg-site-background/95 backdrop-blur-xs flex items-center justify-between px-4 sm:px-10 border-b border-site-border font-heading sticky top-0 z-10 gap-5",
        isOnDashboard && "hidden"
      )}
    >
      <Image
        src={images.logoDark}
        alt="Andy's Gown Logo"
        width={80}
        height={80}
        className="object-contain aspect-auto"
      />
      <Navbar />
      <div className="hidden: xs:block size-20" />
    </header>
  );
};

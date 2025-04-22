"use client";

import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";
import { useIsOnDashboard } from "@/lib/hooks/useIsOnDashboard";

export const Header = () => {
  const { isOnDashboard } = useIsOnDashboard();

  return (
    <header
      className={cn(
        "w-full h-14 bg-site-background/95 backdrop-blur-xs flex items-center justify-center border-b border-site-border font-heading sticky top-0 z-10",
        isOnDashboard && "hidden"
      )}
    >
      <Navbar />
    </header>
  );
};

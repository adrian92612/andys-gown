"use client";

import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";
import { useIsOnDashboard } from "@/lib/hooks/useIsOnDashboard";

export const Header = () => {
  const { isOnDashboard } = useIsOnDashboard();
  console.log(isOnDashboard);

  return (
    <header
      className={cn(
        "w-full h-16 bg-site-background flex items-center justify-center border-b border-site-border font-heading sticky top-0",
        isOnDashboard && "hidden"
      )}
    >
      <Navbar />
    </header>
  );
};

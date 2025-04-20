"use client";

import { Button } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HomeDialog } from "./HomeDialog";
import { useIsActivePath } from "@/lib/hooks/useIsActivePath";

export const Navbar = () => {
  const { isActivePath } = useIsActivePath(route.collections);

  return (
    <nav className="flex h-9 items-center justify-center gap-4">
      <HomeDialog />
      <div className="w-[1px] border-r border-site-text h-full" />

      <Button
        asChild
        variant="ghost"
        style={{ textDecorationThickness: "1px" }}
        className={cn(
          "p-0 text-xl font-bold",
          isActivePath && "underline underline-offset-4"
        )}
      >
        <Link href={route.collections}>COLLECTIONS</Link>
      </Button>
    </nav>
  );
};

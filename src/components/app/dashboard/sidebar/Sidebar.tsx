"use client";

import { LogoutButton } from "./LogoutButton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./SidebarNav";
import { CiSquareChevRight } from "react-icons/ci";

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const handleToggle = () => setOpen(!open);

  return (
    <aside
      className={cn(
        "relative hidden md:flex flex-col justify-between items-center px-0 py-16 w-[180px] overflow-hidden transition-all  text-stone-300",
        !open && "w-[50px]"
      )}
    >
      <div className="w-full">
        <Button
          variant="ghost"
          onClick={handleToggle}
          className={cn(
            "absolute top-2 left-[6px] size-9 transition-all",
            open && " left-[unset] right-2 rotate-180"
          )}
        >
          <CiSquareChevRight className="size-9" />
        </Button>
        <SidebarNav />
      </div>
      <LogoutButton sideBarOpen={open} />
    </aside>
  );
};

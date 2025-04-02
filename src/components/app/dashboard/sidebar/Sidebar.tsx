"use client";

import { LogoutButton } from "./LogoutButton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./SidebarNav";

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const handleToggle = () => setOpen(!open);

  return (
    <aside
      className={cn(
        "flex flex-col justify-between items-center px-4 py-10 border-r-2 overflow-hidden",
        !open && "w-10 px-0"
      )}
    >
      <div>
        <Button onClick={handleToggle}>Toggle</Button>
        <SidebarNav />
      </div>
      <LogoutButton />
    </aside>
  );
};

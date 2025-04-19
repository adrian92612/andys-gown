"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarNav } from "./SidebarNav";
import { useState } from "react";
import { LogoutButton } from "./LogoutButton";
import { TfiMenuAlt } from "react-icons/tfi";

export const MobileNavBar = () => {
  const [open, setOpen] = useState(false);
  const closeSheet = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex md:hidden p-0">
          <TfiMenuAlt className="size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[200px] md:hidden bg-dashboard-primary border-none text-slate-200"
      >
        <SheetHeader className="hidden">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Navigation</SheetDescription>
        </SheetHeader>
        <SidebarNav forMobile closeSheet={closeSheet} />
        <SheetFooter>
          <LogoutButton forMobile />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

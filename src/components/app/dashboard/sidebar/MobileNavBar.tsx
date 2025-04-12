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
import { FaAnglesRight } from "react-icons/fa6";

export const MobileNavBar = () => {
  const [open, setOpen] = useState(false);
  const closeSheet = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex md:hidden border-black">
          <FaAnglesRight />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[200px] md:hidden">
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

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsActivePath } from "@/lib/hooks/useIsActivePath";
import { homeRoute, route } from "@/constants/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/providers/AuthProvider";

export const HomeDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isActivePath } = useIsActivePath(route.home);
  const { user } = useAuth();

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          style={{ textDecorationThickness: "1px" }}
          className={cn(
            "p-0 text-lg sm:text-xl font-bold",
            isActivePath && "underline underline-offset-4"
          )}
        >
          MAISON
        </Button>
      </DialogTrigger>
      <DialogContent className="font-heading max-w-[unset] min-w-full h-full bg-site-background rounded-none border-none">
        <DialogHeader className="h-fit">
          <DialogTitle className="text-center">
            <Link
              href={`${route.home}#welcome`}
              onClick={closeModal}
              className="hover:cursor-pointer"
            >
              MAISON
            </Link>
          </DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col gap-10 items-start w-fit mx-auto">
          {!!homeRoute.length &&
            homeRoute.map((r, i) => (
              <Button
                asChild
                key={i}
                variant="ghost"
                onClick={closeModal}
                style={{ textDecorationThickness: "1px" }}
                className="text-4xl hover:underline underline-offset-4"
              >
                <Link href={r.href}>{r.label}</Link>
              </Button>
            ))}
          {user && (
            <Button
              asChild
              variant="ghost"
              onClick={closeModal}
              style={{ textDecorationThickness: "1px" }}
              className="text-4xl hover:underline underline-offset-4"
            >
              <Link href={route.dashboard}>Dashboard</Link>
            </Button>
          )}
        </nav>
      </DialogContent>
    </Dialog>
  );
};

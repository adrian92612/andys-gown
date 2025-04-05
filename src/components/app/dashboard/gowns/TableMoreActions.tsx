"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/api";
import { ErrorResponse } from "@/lib/api/types";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";

type Props = {
  gownData: Prisma.GownGetPayload<{ include: { images: true } }>;
};

export const TableMoreActions = ({ gownData }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:cursor-pointer">
          <IoMdMore className="size-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <ConfirmDeleteAlert id={gownData.id} />
        </DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type ConfirmDeleteAlertProps = {
  id: string;
};

const ConfirmDeleteAlert = ({ id }: ConfirmDeleteAlertProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { refresh } = useRouter();

  const deleteFn = async () => {
    try {
      setLoading(true);
      const res = await api.gown.deleteGown(id).delete();
      if (res.status === 200) {
        refresh();
        // do something
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          disabled={loading}
          className="w-full hover:cursor-pointer"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFn}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

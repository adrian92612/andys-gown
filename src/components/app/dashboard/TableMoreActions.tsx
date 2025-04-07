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
import { route } from "@/lib/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { BookingWithGownName } from "./bookings/booking-columns";
import { GownWithImage } from "./gowns/gown-columns";

type Props = {
  data: GownWithImage | BookingWithGownName;
};

export const TableMoreActions = ({ data }: Props) => {
  const isGown = "size" in data;
  const link = isGown ? route.editGown : route.editBooking;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <IoMdMore className="size-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <ConfirmDeleteAlert id={data.id} forGown={isGown} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={link(data.id)}>
            <Button variant="ghost" className="w-full">
              Edit
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type ConfirmDeleteAlertProps = {
  id: string;
  forGown?: boolean;
};

const ConfirmDeleteAlert = ({ id, forGown }: ConfirmDeleteAlertProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { refresh } = useRouter();
  const apiCb = forGown ? api.gown.deleteGown : api.booking.deleteBooking;

  const deleteFn = async () => {
    try {
      setLoading(true);
      const res = await apiCb(id).delete();
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
        <Button variant="ghost" disabled={loading} className="w-full">
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

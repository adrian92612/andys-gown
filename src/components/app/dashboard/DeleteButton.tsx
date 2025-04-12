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
import { api } from "@/lib/api";
import { ErrorResponse } from "@/lib/api/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonVariantProps } from "@/types/global";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "sonner";

type Props = {
  itemId: string;
  item: "Gown" | "Booking";
  redirectUrl?: string;
  className?: string;
  closeDropDown?: () => void;
} & ButtonVariantProps;

export const DeleteButton = ({
  itemId,
  item,
  redirectUrl,
  className,
  closeDropDown,
  variant,
  size,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { refresh, push } = useRouter();
  const apiCb =
    item === "Gown" ? api.gown.deleteGown : api.booking.deleteBooking;

  const deleteFn = async () => {
    try {
      setLoading(true);
      const res = await apiCb(itemId).delete();
      if (res.status === 200) {
        toast.success(res.message);
        refresh();
        if (redirectUrl) push(redirectUrl);
      }
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.error);
      console.error(err);
    } finally {
      setLoading(false);
      if (closeDropDown) closeDropDown();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={loading}
          className={className}
        >
          <MdOutlineDeleteForever className="size-6" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this {item.toLowerCase()}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={deleteFn}>
            {loading ? "Deleting..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

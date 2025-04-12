"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { route } from "@/lib/routes";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { BookingColumnType } from "./bookings/booking-columns";
import { GownColumnType } from "./gowns/gown-columns";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";

type Props = {
  data: GownColumnType | BookingColumnType;
};

export const TableMoreActions = ({ data }: Props) => {
  const [openDD, setOpenDD] = useState<boolean>(false);
  const item = "code" in data ? "Gown" : "Booking";
  const editLink = item === "Gown" ? route.editGown : route.editBooking;
  const detailsLink =
    item === "Gown" ? route.gownDetails : route.bookingDetails;

  const closeDropdown = () => setOpenDD(false);

  return (
    <DropdownMenu open={openDD} onOpenChange={setOpenDD} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <IoMdMore className="size-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DeleteButton
            itemId={data.id}
            item={item}
            variant="ghost"
            closeDropDown={closeDropdown}
            className="w-full"
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={editLink(data.id)}>
            <Button variant="ghost" className="w-full">
              Edit
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={detailsLink(data.id)}>
            <Button variant="ghost" className="w-full">
              Details
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

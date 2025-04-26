"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { route } from "@/constants/routes";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { BookingColumnType } from "./bookings/booking-columns";
import { GownColumnType } from "./gowns/gown-columns";
import { DeleteButton } from "./DeleteButton";
import { LinkButton } from "./LinkButton";

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
            className="w-full justify-start"
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LinkButton
            label="Edit"
            href={editLink(data.id)}
            icon="edit"
            variant="ghost"
            className="w-full justify-start"
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LinkButton
            label="Details"
            href={detailsLink(data.id)}
            icon="view"
            variant="ghost"
            className="w-full justify-start"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import { DataTable } from "../DataTable";
import { BookingColumnType, getBookingColumns } from "./booking-columns";

type Props = {
  bookings: BookingColumnType[];
  showGown?: boolean;
};

export const BookingsTable = ({ bookings, showGown = true }: Props) => {
  return (
    <DataTable columns={getBookingColumns({ showGown })} data={bookings} />
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { Booking, Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableMoreActions } from "../TableMoreActions";
import { formatPrice, getBookingStatus } from "@/lib/utils";

export type BookingWithGownName = Prisma.BookingGetPayload<{
  include: { gown: { select: { name: true } } };
}>;

export type BookingColumnType = Booking & {
  gown?: { name: string } | null;
};

export const getBookingColumns = (options?: {
  showGown?: boolean;
}): ColumnDef<BookingColumnType>[] => {
  const bookingColumns: ColumnDef<BookingColumnType>[] = [
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <Button
          variant="columnHeader"
          size="columnHeader"
          onClick={() => column.toggleSorting()}
        >
          Name <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
    },
    {
      accessorFn: (row) => format(row.eventDate, "PPP"),
      id: "eventDate",
      header: ({ column }) => (
        <Button
          variant="columnHeader"
          size="columnHeader"
          onClick={() => column.toggleSorting()}
        >
          Event On <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      enableGlobalFilter: true,
    },
    {
      accessorFn: (row) =>
        `${row.downpayment} ${row.isDownpaymentPaid ? "paid" : "pending"}`,
      id: "downpayment",
      header: ({ column }) => (
        <Button
          variant="columnHeader"
          size="columnHeader"
          onClick={() => column.toggleSorting()}
        >
          Downpayment <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.original.downpayment;
        const isPaid = row.original.isDownpaymentPaid;
        const status = isPaid ? "Paid" : "Pending";
        const bgColor = isPaid ? "bg-green-700" : "bg-red-700";
        return (
          <div className="flex items-center gap-2">
            <span>{formatPrice(price)}</span>
            <Badge className={bgColor}>{status}</Badge>
          </div>
        );
      },
    },
    {
      accessorFn: (row) =>
        `${row.price} ${row.isPricePaid ? "paid" : "pending"}`,
      id: "price",
      header: ({ column }) => (
        <Button
          variant="columnHeader"
          size="columnHeader"
          onClick={() => column.toggleSorting()}
        >
          Price <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.original.price;
        const isPaid = row.original.isPricePaid;
        const status = isPaid ? "Paid" : "Pending";
        const bgColor = isPaid ? "bg-green-700" : "bg-red-700";
        return (
          <div className="flex items-center gap-2">
            <span>{formatPrice(price)}</span>
            <Badge className={bgColor}>{status}</Badge>
          </div>
        );
      },
    },

    {
      accessorFn: (row) => getBookingStatus(row.eventDate),
      id: "bookingStatus",
      header: ({ column }) => (
        <Button
          variant="columnHeader"
          size="columnHeader"
          onClick={() => column.toggleSorting()}
        >
          Status <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = getBookingStatus(row.original.eventDate);
        const bgColor =
          status === "Completed"
            ? "bg-green-700"
            : status === "Ongoing"
            ? "bg-gray-700"
            : "bg-amber-700";
        return <Badge className={bgColor}>{status}</Badge>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="w-8">
            <TableMoreActions data={row.original} />
          </div>
        );
      },
    },
  ];

  if (options?.showGown) {
    bookingColumns.splice(1, 0, {
      accessorFn: (row) => row.gown?.name ?? null,
      id: "gown",
      header: ({ column }) => (
        <Button
          variant="columnHeader"
          size="columnHeader"
          onClick={() => column.toggleSorting()}
        >
          Gown <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const gownName = row.original.gown?.name;
        return (
          <span className={!gownName ? "text-red-700 italic" : ""}>
            {gownName ?? "Deleted"}
          </span>
        );
      },
    });
  }

  return bookingColumns;
};

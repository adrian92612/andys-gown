"use client";

import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableMoreActions } from "../TableMoreActions";

export type BookingWithGownName = Prisma.BookingGetPayload<{
  include: { gown: { select: { name: true } } };
}>;

export const bookingColumns: ColumnDef<BookingWithGownName>[] = [
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
    accessorFn: (row) => row.gown.name,
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
    enableGlobalFilter: true,
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
          <span>₱{price}</span>
          <Badge className={bgColor}>{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => `${row.price} ${row.isPricePaid ? "paid" : "pending"}`,
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
          <span>₱{price}</span>
          <Badge className={bgColor}>{status}</Badge>
        </div>
      );
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

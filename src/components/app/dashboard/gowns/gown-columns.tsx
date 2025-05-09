"use client";

import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { TableMoreActions } from "../TableMoreActions";
import { formatCategory, getGownStatus } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type GownColumnType = Prisma.GownGetPayload<{
  include: {
    images: true;
    bookings: {
      select: { pickUpDate: true; eventDate: true; returnDate: true };
    };
  };
}>;

export const gownColumns: ColumnDef<GownColumnType>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.getValue("images") as { url: string }[];
      const firstImage = images?.[0]?.url;

      return (
        <div className="relative w-12 h-20">
          {firstImage ? (
            <Image
              src={firstImage}
              alt="Gown Image"
              fill
              className="object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              No Image
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
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
    accessorKey: "code",
    header: ({ column }) => (
      <Button
        variant="columnHeader"
        size="columnHeader"
        onClick={() => column.toggleSorting()}
      >
        Code <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <Button
        variant="columnHeader"
        size="columnHeader"
        onClick={() => column.toggleSorting()}
      >
        Color <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => formatCategory(row.category),
    id: "category",
    header: ({ column }) => (
      <Button
        variant="columnHeader"
        size="columnHeader"
        onClick={() => column.toggleSorting()}
      >
        Category <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
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
      const price = row.getValue("price") as number;
      return `₱${price.toLocaleString()}`;
    },
  },
  {
    accessorFn: (row) => getGownStatus(row.bookings).status,
    id: "gownStatus",
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
      const { status, badgeColor } = getGownStatus(row.original.bookings);
      return <Badge className={badgeColor}>{status}</Badge>;
    },
    enableGlobalFilter: true,
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

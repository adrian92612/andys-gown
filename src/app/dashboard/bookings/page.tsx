import { bookingColumns } from "@/components/app/dashboard/bookings/booking-columns";
import { DataTable } from "@/components/app/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { route } from "@/lib/routes";
import Link from "next/link";

const BookingsPage = async () => {
  const bookings = await prisma.booking.findMany({
    include: { gown: { select: { name: true } } },
    orderBy: {
      eventDate: "desc",
    },
  });

  return (
    <div>
      <div className="flex justify-end">
        <Link href={route.newBooking} className="ml-auto">
          <Button>Add Booking</Button>
        </Link>
      </div>
      <DataTable data={bookings} columns={bookingColumns} />
    </div>
  );
};

export default BookingsPage;

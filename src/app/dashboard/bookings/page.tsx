import { LinkButton } from "@/components/app/dashboard/LinkButton";
import { BookingsTable } from "@/components/app/dashboard/bookings/BookingsTable";
import { prisma } from "@/lib/prisma";
import { route } from "@/constants/routes";

const BookingsPage = async () => {
  const bookings = await prisma.booking.findMany({
    include: { gown: { select: { name: true } } },
    orderBy: {
      eventDate: "desc",
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-end items-center">
        <LinkButton label="Add Booking" href={route.newBooking()} icon="add" />
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default BookingsPage;

import { BookingForm } from "@/components/app/dashboard/bookings/BookingForm";
import { prisma } from "@/lib/prisma";

const AddBookingPage = async () => {
  const gownList = await prisma.gown.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const bookingDates = (await prisma.booking.findMany({
    where: {
      returnDate: {
        gte: new Date(),
      },
      gownId: { not: null },
    },
    select: {
      gownId: true,
      pickUpDate: true,
      eventDate: true,
      returnDate: true,
    },
  })) as {
    gownId: string;
    pickUpDate: Date;
    eventDate: Date;
    returnDate: Date;
  }[];

  return (
    <div>
      AddBookingPage
      <BookingForm gownList={gownList} bookingDates={bookingDates} />
    </div>
  );
};

export default AddBookingPage;

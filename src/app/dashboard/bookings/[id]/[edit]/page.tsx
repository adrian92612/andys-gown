import { BookingForm } from "@/components/app/dashboard/bookings/BookingForm";
import { getBookingDates, getGownListForForm } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const EditBookingPage = async ({ params }: Props) => {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      gown: { select: { id: true, name: true } },
    },
  });
  const gownList = await getGownListForForm();
  const bookingDates = await getBookingDates();
  if (!booking) return notFound();

  const { gownId, notes, ...formFields } = booking;

  const bookingData = {
    ...formFields,
    gownId: gownId ?? "",
    notes: notes ?? "",
  };

  return (
    <div>
      EditBookingPage
      <BookingForm
        bookingData={bookingData}
        gownList={gownList}
        bookingDates={bookingDates}
      />
    </div>
  );
};

export default EditBookingPage;

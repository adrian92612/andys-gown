import { BookingForm } from "@/components/app/dashboard/bookings/BookingForm";
import { getBookingDates, getGownListForForm } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: {
      gown: { select: { name: true } },
    },
  });

  if (!booking) {
    return {
      title: "Edit Booking",
      description: "Booking not found.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Edit Booking: ${booking.gown?.name}`,
    description: `Modify booking details for "${booking.gown?.name}".`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

const EditBookingPage = async ({ params }: Props) => {
  const { id } = await params;

  const [booking, gownList, bookingDates] = await Promise.all([
    prisma.booking.findUnique({
      where: { id },
      include: {
        gown: { select: { id: true, name: true } },
      },
    }),
    getGownListForForm(),
    getBookingDates(),
  ]);
  if (!booking) return notFound();

  const { gownId, notes, ...formFields } = booking;

  const bookingData = {
    ...formFields,
    gownId: gownId ?? "",
    notes: notes ?? "",
  };

  return (
    <div>
      <BookingForm
        bookingData={bookingData}
        gownList={gownList}
        bookingDates={bookingDates}
      />
    </div>
  );
};

export default EditBookingPage;

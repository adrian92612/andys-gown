import { BookingDetails } from "@/components/app/dashboard/bookings/BookingDetails";
import { DeleteButton } from "@/components/app/dashboard/DeleteButton";
import { LinkButton } from "@/components/app/dashboard/LinkButton";
import { prisma } from "@/lib/prisma";
import { route } from "@/constants/routes";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { gown: { select: { name: true } } },
  });

  if (!booking) {
    return {
      title: "Booking Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Booking: ${booking.gown?.name}`,
    description: `Details for booking of "${booking.gown?.name}".`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

const BookingDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  if (!id) return notFound();

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      gown: {
        include: {
          images: {
            select: { url: true },
          },
        },
      },
    },
  });

  if (!booking) return notFound();
  return (
    <section className="space-y-5">
      <div className="flex justify-end items-center gap-2">
        <LinkButton
          label="Edit"
          href={route.editBooking(booking.id)}
          icon="edit"
        />
        <DeleteButton
          item="Booking"
          variant="destructive"
          itemId={booking.id}
          redirectUrl={route.bookings}
        />
      </div>
      <BookingDetails booking={booking} />
    </section>
  );
};

export default BookingDetailsPage;

import { BookingDetails } from "@/components/app/dashboard/bookings/BookingDetails";
import { DeleteButton } from "@/components/app/dashboard/DeleteButton";
import { LinkButton } from "@/components/app/dashboard/LinkButton";
import { prisma } from "@/lib/prisma";
import { route } from "@/constants/routes";
import { notFound } from "next/navigation";

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

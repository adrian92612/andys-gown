import { DeleteButton } from "@/components/app/dashboard/DeleteButton";
import { LinkButton } from "@/components/app/dashboard/LinkButton";
import { GownDetails } from "@/components/app/dashboard/gowns/GownDetails";
import { prisma } from "@/lib/prisma";
import { route } from "@/constants/routes";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const gown = await prisma.gown.findUnique({
    where: { id },
    select: { name: true },
  });

  if (!gown) {
    return {
      title: "Gown Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: gown.name,
    description: `Manage bookings and details for "${gown.name}".`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const GownDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  if (!id) return notFound();

  const gown = await prisma.gown.findUnique({
    where: { id },
    include: {
      images: {
        select: {
          url: true,
        },
      },
      bookings: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!gown) return notFound();

  return (
    <section className="space-y-5">
      <div className="flex justify-end items-center gap-2">
        <LinkButton label="Edit" href={route.editGown(gown.id)} icon="edit" />
        <LinkButton
          label="Add Booking"
          href={route.newBooking(gown.id)}
          icon="add"
        />
        <DeleteButton
          item="Gown"
          variant="destructive"
          itemId={gown.id}
          redirectUrl={route.gowns}
        />
      </div>
      <GownDetails gownData={gown} />
    </section>
  );
};

export default GownDetailsPage;

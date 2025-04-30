import { OtherGowns } from "@/components/app/collections/gown-details/OtherGowns";
import { SiteGownDetails } from "@/components/app/collections/gown-details/SiteGownDetails";
import { FAQsSection } from "@/components/app/home/faqs/FAQsSection";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const GownDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const [gown, rawGowns] = await Promise.all([
    prisma.gown.findUnique({
      where: { id },
      include: {
        images: {
          select: { url: true, id: true },
          orderBy: { createdAt: "asc" },
        },
        bookings: {
          select: {
            pickUpDate: true,
            eventDate: true,
            returnDate: true,
          },
        },
      },
    }),

    prisma.$queryRaw<
      {
        id: string;
        name: string;
        price: number;
        imageId: string;
        imageUrl: string;
      }[]
    >(
      Prisma.sql`
    SELECT 
      g."id", 
      g."name", 
      g."price", 
      (
        SELECT i."id"
        FROM "Image" i
        WHERE i."gownId" = g."id"
        ORDER BY i."createdAt" ASC
        LIMIT 1
      ) AS "imageId",
      (
        SELECT i."url"
        FROM "Image" i
        WHERE i."gownId" = g."id"
        ORDER BY i."createdAt" ASC
        LIMIT 1
      ) AS "imageUrl"
    FROM "Gown" g
    WHERE g."id" != ${id}
    ORDER BY RANDOM()
    LIMIT 6;
  `
    ),
  ]);

  if (!gown) return notFound();

  const otherGowns = rawGowns.map((g) => ({
    id: g.id,
    name: g.name,
    price: g.price,
    images: [
      {
        id: g.imageId,
        url: g.imageUrl,
      },
    ],
  }));

  return (
    <>
      <SiteGownDetails gown={gown} />
      <FAQsSection />
      <OtherGowns gowns={otherGowns} />
    </>
  );
};

export default GownDetailsPage;

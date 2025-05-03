import { OtherGowns } from "@/components/app/collections/gown-details/OtherGowns";
import { SiteGownDetails } from "@/components/app/collections/gown-details/SiteGownDetails";
import { FAQsSection } from "@/components/app/home/faqs/FAQsSection";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const gown = await prisma.gown.findUnique({
    where: { id },
    select: {
      name: true,
      images: {
        select: { url: true },
        orderBy: { createdAt: "asc" },
        take: 1,
      },
    },
  });

  if (!gown) return {};

  return {
    title: `${gown.name} | Andy's Gown Rental`,
    description: "Explore this elegant gown for your next event.",
    openGraph: {
      title: `${gown.name} | Andy's Gown Rental`,
      description: "Explore this elegant gown for your next event.",
      url: `https://andysgownrental.com/gown/${id}`,
      siteName: "Andy's Gown Rental",
      images: gown.images.length
        ? [
            {
              url: gown.images[0].url,
              width: 1200,
              height: 630,
              alt: gown.name,
            },
          ]
        : [],
      type: "article",
      locale: "en_PH",
    },
    twitter: {
      card: "summary_large_image",
      title: `${gown.name} | Andy's Gown Rental`,
      description: "Explore this elegant gown for your next event.",
      images: gown.images.length ? [gown.images[0].url] : [],
    },
  };
}

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

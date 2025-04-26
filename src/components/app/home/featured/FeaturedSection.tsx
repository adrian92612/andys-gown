import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { route } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Gown } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { ImageOverlay } from "./ImageOverlay";

export const FeaturedSection = async () => {
  const featuredGownIds = await prisma.$queryRaw<Gown[]>`
    SELECT id FROM "Gown"
    ORDER BY RANDOM()
    LIMIT 2
  `;

  const ids = await featuredGownIds.map((g) => g.id);
  const gowns = await prisma.gown.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      images: {
        take: 1,
      },
    },
  });

  return (
    <section className="p-4 bg-site-text/95 mt-0.5">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start justify-center h-full px-4 py-10 text-site-text-light">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-site-primary">Highlights</span> of the Moment
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Discover pieces curated just for you — refreshed each visit.
          </p>
          <Button
            asChild
            variant="link"
            className="p-0 text-site-text-light hover:text-site-primary"
          >
            <Link href={route.collections} target="_blank">
              Browse Collections <HiArrowLongRight />
            </Link>
          </Button>
        </div>
        {!!gowns.length &&
          gowns.map((g, i) => (
            <div
              key={g.id}
              className={cn(
                "relative group aspect-[4/5] w-full overflow-hidden",
                i === 1 && "hidden md:block"
              )}
            >
              <Image
                src={g.images[0].url}
                alt={g.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              <ImageOverlay id={g.id} />
            </div>
          ))}
      </div>
    </section>
  );
};

import { prisma } from "@/lib/prisma";
import { CollectionsGownGrid } from "./CollectionsGownGrid";
import { CollectionsHeroSection } from "./CollectionsHeroSection";

export const CollectionsBlock = async () => {
  const gownList = await prisma.gown.findMany({
    include: {
      images: { select: { url: true }, take: 1 },
    },
  });

  return (
    <div className="flex flex-col grow">
      <CollectionsHeroSection />
      <CollectionsGownGrid gownList={gownList} />
    </div>
  );
};

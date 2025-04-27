import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";

type Props = {
  gown: Prisma.GownGetPayload<{
    include: { images: { select: { url: true }; take: 1 } };
  }>;
};

export const GownCard = ({ gown }: Props) => {
  return (
    <Card className="rounded-none shadow-site-primary/20 shadow-md p-0 bg-site-background h-fit">
      <CardHeader className="hidden">
        <CardTitle>{gown.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative group aspect-[4/5] w-full overflow-hidden hover:cursor-pointer">
          <Image
            src={gown.images[0].url}
            alt={gown.name}
            fill
            className="object-cover transition duration-1000 group-hover:scale-110"
          />
        </div>
        <div className="flex items-center justify-between text-sm font-bold p-2">
          <span className="text-site-text/90  leading-snug ">{gown.name}</span>
          <span className="text-site-text/70">{formatPrice(gown.price)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

import { Prisma } from "@prisma/client";
import { GownCard } from "../GownCard";

type Props = {
  gowns: Prisma.GownGetPayload<{
    select: {
      id: true;
      name: true;
      price: true;
      images: {
        select: {
          id: true;
          url: true;
        };
        take: 1;
      };
    };
  }>[];
};

export const OtherGowns = ({ gowns }: Props) => {
  return (
    <div className="w-full bg-site-text/95 py-20 space-y-10">
      <h2 className="text-site-text-light text-center text-3xl font-bold">
        Discover other gowns you may love from our curated list
      </h2>
      <div className="max-w-7xl mx-auto  flex items-center gap-10 overflow-scroll px-8">
        {!!gowns.length ? (
          gowns.map((g) => (
            <div key={g.id} className="shrink-0 w-[300px]">
              <GownCard gown={g} />
            </div>
          ))
        ) : (
          <div>Loading gowns...</div>
        )}
      </div>
    </div>
  );
};

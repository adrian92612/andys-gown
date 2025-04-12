import { DataTable } from "@/components/app/dashboard/DataTable";
import { LinkButton } from "@/components/app/dashboard/LinkButton";
import { gownColumns } from "@/components/app/dashboard/gowns/gown-columns";
import { prisma } from "@/lib/prisma";
import { route } from "@/lib/routes";

const GownsPage = async () => {
  const gowns = await prisma.gown.findMany({
    include: {
      images: true,
      bookings: {
        where: {
          returnDate: {
            gte: new Date(),
          },
        },
        select: { pickUpDate: true, eventDate: true, returnDate: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="w-full space-y-4">
      <div className="flex justify-end">
        <LinkButton label="Add Gown" href={route.newGown} />
      </div>
      <DataTable columns={gownColumns} data={gowns} />
    </section>
  );
};

export default GownsPage;

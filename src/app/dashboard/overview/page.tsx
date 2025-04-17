import { StatCard } from "@/components/app/dashboard/overview/StatCards";
import { UpcomingBookingsCard } from "@/components/app/dashboard/overview/UpcomingBookingsCard";
import { prisma } from "@/lib/prisma";

const OverviewPage = async () => {
  const [totalGowns, totalBookings, upcomingBookings] = await Promise.all([
    prisma.gown.count(),
    prisma.booking.count(),
    prisma.booking.findMany({
      where: {
        eventDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        eventDate: "asc",
      },
      take: 3,
      include: {
        gown: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    }),
  ]);

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <StatCard label="Total Gowns" value={totalGowns} />
        <StatCard label="Total Bookings" value={totalBookings} />
      </section>
      <section>
        <UpcomingBookingsCard data={upcomingBookings} />
      </section>
    </div>
  );
};

export default OverviewPage;

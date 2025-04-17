import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

type Props = {
  data: Prisma.BookingGetPayload<{
    include: {
      gown: {
        select: {
          name: true;
          code: true;
        };
      };
    };
  }>[];
};

export const UpcomingBookingsCard = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-5">
          {data.map((d) => (
            <li key={d.id} className="grid grid-cols-3 gap-2">
              <div>
                <p>Customer</p>
                <p>{d.customerName}</p>
              </div>
              <div>
                <p>Event Date</p>
                <p>{format(d.eventDate, "PPP")}</p>
              </div>
              <div>
                <p>Gown</p>
                <p>{d.gown?.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

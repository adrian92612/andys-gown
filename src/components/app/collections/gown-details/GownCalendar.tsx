"use client";

import { Calendar } from "@/components/ui/calendar";
import { Prisma } from "@prisma/client";

type Props = {
  disabledDates: Prisma.BookingGetPayload<{
    select: {
      pickUpDate: true;
      eventDate: true;
      returnDate: true;
    };
  }>[];
};

const GownCalendar = ({ disabledDates }: Props) => {
  const bookDates = disabledDates.map((d) => d.eventDate);
  return (
    <div className="flex flex-col items-start">
      <h3 className="font-bold">Booking Schedules</h3>
      <Calendar
        mode="single"
        disabled={true}
        modifiers={{
          booked: bookDates,
        }}
        modifiersClassNames={{
          booked: "text-red-500 font-bold border-red-500 border-2",
        }}
        classNames={{
          cell: "size-9",
          head_cell: "rounded-md w-9 font-normal text-[0.8rem]",
          day_disabled: "text-site-text bg-site-background/90",
          day_today: "text-site-text",
        }}
        initialFocus
      />
    </div>
  );
};

export default GownCalendar;

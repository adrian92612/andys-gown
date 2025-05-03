import { BookingForm } from "@/components/app/dashboard/bookings/BookingForm";
import { getBookingDates, getGownListForForm } from "@/lib/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Booking",
  description: "Create a new booking and assign it to a gown.",
  robots: {
    index: false,
    follow: false,
  },
};

const AddBookingPage = async () => {
  const [gownList, bookingDates] = await Promise.all([
    getGownListForForm(),
    getBookingDates(),
  ]);

  return (
    <div>
      <BookingForm gownList={gownList} bookingDates={bookingDates} />
    </div>
  );
};

export default AddBookingPage;

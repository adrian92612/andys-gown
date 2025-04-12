import { BookingForm } from "@/components/app/dashboard/bookings/BookingForm";
import { getBookingDates, getGownListForForm } from "@/lib/actions";
import { Suspense } from "react";

const AddBookingPage = async () => {
  const gownList = await getGownListForForm();
  const bookingDates = await getBookingDates();

  return (
    <div>
      AddBookingPage
      <Suspense fallback={<p>Loading Booking Form...</p>}>
        <BookingForm gownList={gownList} bookingDates={bookingDates} />
      </Suspense>
    </div>
  );
};

export default AddBookingPage;

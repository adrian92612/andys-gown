import { BookingForm } from "@/components/app/dashboard/bookings/BookingForm";
import { getBookingDates, getGownListForForm } from "@/lib/actions";

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

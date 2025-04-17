import { BookingForm } from "@/components/app/dashboard/bookings/BookingForm";
import { getBookingDates, getGownListForForm } from "@/lib/actions";

const AddBookingPage = async () => {
  const gownList = await getGownListForForm();
  const bookingDates = await getBookingDates();

  return (
    <div>
      <BookingForm gownList={gownList} bookingDates={bookingDates} />
    </div>
  );
};

export default AddBookingPage;

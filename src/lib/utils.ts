import { GownStatus } from "@/types/global";
import { clsx, type ClassValue } from "clsx";
import { addDays, isSameDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function restrictWholeNumberInput(
  e: React.KeyboardEvent<HTMLInputElement>
) {
  const invalidKeys = ["e", ".", ",", "-"];

  if (invalidKeys.includes(e.key)) {
    e.preventDefault();
  }
}

export function sanitizeWholeNumberOnBlur(
  e: React.FocusEvent<HTMLInputElement>
) {
  const raw = e.currentTarget.value;
  const cleaned = raw.replace(/^0+(?=\d)/, ""); // remove leading zeroes but keep "0"
  e.currentTarget.value = cleaned;
}

export function getPickUpAndReturnDates(eventDate: Date) {
  return {
    pickUpDate: addDays(eventDate, -1),
    returnDate: addDays(eventDate, 1),
  };
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPrice(n: number) {
  return n.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  });
}

export function getBookingStatus(eventDate: Date) {
  const today = new Date();
  return eventDate < today
    ? "Completed"
    : eventDate > today
    ? "Upcoming"
    : "Ongoing";
}

type GetGownStatusProps = {
  pickUpDate: Date;
  eventDate: Date;
  returnDate: Date;
}[];

export function getGownStatus(bookings: GetGownStatusProps): GownStatus {
  const today = new Date();

  for (const b of bookings) {
    if (isSameDay(today, b.pickUpDate)) return "For Pick Up";
    if (isSameDay(today, b.eventDate)) return "On Event";
    if (isSameDay(today, b.returnDate)) return "For Return";
  }
  return "In Store";
}

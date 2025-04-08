import { clsx, type ClassValue } from "clsx";
import { addDays } from "date-fns";
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

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
  const status =
    eventDate < today
      ? "Completed"
      : eventDate > today
      ? "Upcoming"
      : "Ongoing";

  const badgeColor = {
    Completed: "bg-green-700",
    Ongoing: "bg-gray-700",
    Upcoming: "bg-amber-700",
  }[status];

  return { status, badgeColor };
}

type GetGownStatusProps = {
  pickUpDate: Date;
  eventDate: Date;
  returnDate: Date;
}[];

export function getGownStatus(bookings: GetGownStatusProps): {
  status: GownStatus;
  badgeColor: string;
} {
  const today = new Date();

  let status: GownStatus = "In Store";

  for (const b of bookings) {
    if (isSameDay(today, b.pickUpDate)) {
      status = "For Pick Up";
      break;
    }
    if (isSameDay(today, b.eventDate)) {
      status = "On Event";
      break;
    }
    if (isSameDay(today, b.returnDate)) {
      status = "For Return";
      break;
    }
  }

  const badgeColor = {
    "In Store": "bg-gray-600",
    "For Pick Up": "bg-amber-500 ",
    "On Event": "bg-blue-600 ",
    "For Return": "bg-red-600 ",
  }[status];

  return { status, badgeColor };
}

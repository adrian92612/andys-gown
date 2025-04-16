"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { route } from "./routes";

export const getGownListForForm = async () => {
  try {
    return await prisma.gown.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("[GET_GOWN_LIST_FAILED]: ", error);
    throw error;
  }
};

export const getBookingDates = async () => {
  try {
    return (await prisma.booking.findMany({
      where: {
        returnDate: {
          gte: new Date(),
        },
        gownId: { not: null },
      },
      select: {
        gownId: true,
        pickUpDate: true,
        eventDate: true,
        returnDate: true,
      },
    })) as {
      gownId: string;
      pickUpDate: Date;
      eventDate: Date;
      returnDate: Date;
    }[];
  } catch (error) {
    console.error("[GET_BOOKING_DATES_FAILED]: ", error);
    throw error;
  }
};

export async function revalidateStaticPaths() {
  revalidatePath(route.home);
  revalidatePath(route.collections);
  revalidatePath(route.dashboard);
  revalidatePath(route.gowns);
  revalidatePath(route.bookings);
  revalidatePath(route.newGown);
  revalidatePath(route.newBooking());
}

export async function revalidateGownPaths(id: string) {
  revalidatePath(route.newBooking(id));
  revalidatePath(route.editGown(id));
  revalidatePath(route.gownDetails(id));
}

export async function revalidateBookingPaths(id: string) {
  revalidatePath(route.editBooking(id));
  revalidatePath(route.bookingDetails(id));
}

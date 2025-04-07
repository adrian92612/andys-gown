"use server";

import { prisma } from "./prisma";

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

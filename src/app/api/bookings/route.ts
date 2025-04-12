import { errorResponse, successResponse } from "@/lib/api/responses";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { route } from "@/lib/routes";
import { getPickUpAndReturnDates } from "@/lib/utils";
import { bookingSchema } from "@/lib/zod/booking";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authErr = await requireAdmin();
    if (authErr) return authErr;

    const body = await req.json();
    const parsed = await bookingSchema.omit({ id: true }).safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid data", 400);
    }

    const { eventDate, ...bookingData } = parsed.data;
    const { pickUpDate, returnDate } = getPickUpAndReturnDates(eventDate);

    const existingGown = await prisma.gown.findUnique({
      where: { id: bookingData.gownId },
    });

    if (!existingGown) {
      return errorResponse("Selected gown does not exist.", 400);
    }

    const booking = await prisma.booking.create({
      data: {
        ...bookingData,
        pickUpDate,
        eventDate,
        returnDate,
      },
    });

    revalidatePath(route.bookings);
    revalidatePath(route.bookingDetails(booking.id));
    return successResponse(booking, "Event has been booked.", 201);
  } catch (error) {
    console.error("[BOOKING_CREATION_FAILED]: ", error);
    return errorResponse();
  }
}

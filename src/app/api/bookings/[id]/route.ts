import { errorResponse, successResponse } from "@/lib/api/responses";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const authErr = await requireAdmin();
    if (authErr) return authErr;

    const { id } = await params;
    if (!id) {
      return errorResponse("No ID found.", 400);
    }

    try {
      await prisma.booking.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return errorResponse("No booking found.", 404);
      }
      throw error;
    }

    return successResponse(null, "Booking has been deleted.");
  } catch (error) {
    console.error("[BOOKING_DELETION_FAILED]: ", error);
    return errorResponse();
  }
}

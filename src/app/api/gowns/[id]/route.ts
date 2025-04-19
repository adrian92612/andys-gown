import { errorResponse, successResponse } from "@/lib/api/responses";
import { requireAdmin } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { gownSchema } from "@/lib/zod/gown";
import { Category, Prisma } from "@prisma/client";
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

    const gown = await prisma.gown.findUnique({
      where: { id },
      include: { images: true, bookings: { select: { id: true } } },
    });

    if (!gown) {
      return errorResponse("Gown not found.", 404);
    }

    const publicIds = gown.images.map((img) => img.publicId);

    try {
      await prisma.gown.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return errorResponse("Gown already deleted.", 404);
      }
      throw error;
    }

    await Promise.all(
      publicIds.map((id) =>
        cloudinary.uploader.destroy(id).catch((err) => {
          console.error(`[CLOUDINARY_DELETE_FAILED]: ${id}`, err);
        })
      )
    );

    return successResponse(null, "Gown has been deleted.");
  } catch (error) {
    console.error("[GOWN_DELETION:ERROR]: ", error);
    return errorResponse();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authErr = await requireAdmin();
    if (authErr) return authErr;

    const body = await req.json();
    const parsed = gownSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid data.", 400);
    }

    const gownData = parsed.data;

    if (!gownData.id) {
      return errorResponse("Missing ID", 400);
    }

    const existingGown = await prisma.gown.findUnique({
      where: {
        id: gownData.id,
      },
      include: { images: true },
    });

    if (!existingGown) {
      return errorResponse("Gown not found.", 404);
    }

    const conflictingGown = await prisma.gown.findFirst({
      where: {
        NOT: {
          id: gownData.id,
        },
        OR: [{ name: gownData.name }, { code: gownData.code }],
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });

    if (conflictingGown) {
      return errorResponse(
        `Gown with this ${
          conflictingGown.name === gownData.name ? "name" : "code"
        } already exists.`,
        409
      );
    }

    const oldPublicIds = existingGown.images.map((img) => img.publicId);
    const newPublicIds = gownData.images.map((img) => img.publicId);
    const imagesToAdd = gownData.images.filter(
      (img) => !oldPublicIds.includes(img.publicId)
    );
    const imagesToDelete = existingGown.images.filter(
      (img) => !newPublicIds.includes(img.publicId)
    );

    const updatedGown = await prisma.gown.update({
      where: { id: gownData.id },
      include: { images: true, bookings: { select: { id: true } } },
      data: {
        ...gownData,
        category: gownData.category as Category,
        images: {
          deleteMany: {
            publicId: {
              in: imagesToDelete.map((img) => img.publicId),
            },
          },
          create: imagesToAdd,
        },
      },
    });

    return successResponse(updatedGown, "Gown has been updated.");
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return errorResponse(
        "A gown with this name or code already exists.",
        409
      );
    }
    console.error("[GOWN_UPDATING_FAILED]: ", error);
    return errorResponse();
  }
}

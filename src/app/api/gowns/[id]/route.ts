import { errorResponse, successResponse } from "@/lib/api/responses";
import { getCurrentUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (user?.name !== "Andreana Abad") {
      return errorResponse("Unauthorized Access", 401);
    }

    const gown = await prisma.gown.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!gown) {
      return errorResponse("Gown not found.", 404);
    }

    const publicIds = gown.images.map((img) => img.publicId);

    await prisma.gown.delete({ where: { id } });

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

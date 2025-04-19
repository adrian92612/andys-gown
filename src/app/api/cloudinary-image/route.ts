import { errorResponse, successResponse } from "@/lib/api/responses";
import cloudinary from "@/lib/cloudinary";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return errorResponse("Missing image id", 400);
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return successResponse(null, "Image has been deleted.");
    }
    return errorResponse("Failed to delete image.", 500);
  } catch (error) {
    console.error("[DELETE_IMAGE_ERROR]: ", error);
    return errorResponse();
  }
}

import { revalidateGownPaths, revalidateStaticPaths } from "@/lib/actions";
import { errorResponse, successResponse } from "@/lib/api/responses";
import { prisma } from "@/lib/prisma";
import { gownSchema } from "@/lib/zod/gown";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = gownSchema.omit({ id: true }).safeParse(body);
    if (!parsed.success) {
      return errorResponse("Invalid Data", 400);
    }
    const { images, ...gownData } = parsed.data;

    const gown = await prisma.gown.create({
      data: {
        ...gownData,
        images: {
          create: images,
        },
      },
      include: { images: true },
    });

    revalidateStaticPaths()
    revalidateGownPaths(gown.id)

    return successResponse(gown, "Gown has been created successfully.", 201);
  } catch (error) {
    console.error("[CREATE_GOWN_ERROR]: ", error);
    return errorResponse("Failed to create gown, try again later");
  }
}

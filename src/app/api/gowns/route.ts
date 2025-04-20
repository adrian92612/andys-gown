import { errorResponse, successResponse } from "@/lib/api/responses";
import { prisma } from "@/lib/prisma";
import { gownSchema } from "@/lib/zod/gown";
import { Category, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = gownSchema.omit({ id: true }).safeParse(body);
    if (!parsed.success) {
      return errorResponse("Invalid Data", 400);
    }
    const { images, ...gownData } = parsed.data;

    const existingGown = await prisma.gown.findFirst({
      where: {
        OR: [{ name: gownData.name }, { code: gownData.code }],
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });

    if (existingGown) {
      return errorResponse(
        `Gown with this ${
          existingGown.name === gownData.name ? "name" : "code"
        } already exists.`,
        409
      );
    }

    const gown = await prisma.gown.create({
      data: {
        ...gownData,
        category: gownData.category as Category,
        images: {
          create: images,
        },
      },
      include: { images: true },
    });

    return successResponse(gown, "Gown has been created successfully.", 201);
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

    console.error("[CREATE_GOWN_ERROR]: ", error);
    return errorResponse("Failed to create gown, try again later");
  }
}

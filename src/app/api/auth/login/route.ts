import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateToken, setAuthCookies } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/zod/auth";
import { errorResponse, successResponse } from "@/lib/api/responses";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = loginSchema.safeParse(body);

    if (!parsedBody.success) {
      return errorResponse("Invalid credentials", 400);
    }

    const { username, password } = parsedBody.data;

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse("Invalid credentials", 401);
    }

    const token = await generateToken({ id: user.id, name: user.name });
    const res = successResponse(null, "Login successful!");
    setAuthCookies(res, token);
    return res;
  } catch (error) {
    console.error("[LOGIN_ERROR]: ", error);
    return errorResponse();
  }
}

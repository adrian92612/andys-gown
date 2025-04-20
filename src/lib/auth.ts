import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { errorResponse } from "./api/responses";

export type TokenPayload = {
  id: string;
  name: string;
};

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET!);

export const generateToken = async (payload: TokenPayload): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
};

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(token, SECRET);
  return payload as TokenPayload;
};

export const setAuthCookies = (res: NextResponse, token: string) => {
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearAuthCookies = (res: NextResponse) => {
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
};

export const getCurrentUser = async (
  reqCookies?: RequestCookies
): Promise<TokenPayload | null> => {
  const cookieStore = reqCookies ?? (await cookies());
  const token = cookieStore.get("token")?.value;

  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch (error) {
    console.error("[GET_CURRENT_USER_ERROR]: ", error);
    return null;
  }
};

export const requireAdmin = async () => {
  const user = await getCurrentUser();
  if (!user) return errorResponse("Unauthorized access.", 401);
  return null;
};

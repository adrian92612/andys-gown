import { clearAuthCookies } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api/responses";

export async function POST() {
  try {
    const res = successResponse(null, "Logged out successfully!");
    clearAuthCookies(res);
    return res;
  } catch (error) {
    console.error("[LOGOUT_ERROR]: ", error);
    return errorResponse();
  }
}

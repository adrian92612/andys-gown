import { NextResponse } from "next/server";
import { ApiResponse } from "./types";

export const successResponse = <T>(
  data: T,
  message: string = "Success",
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json({ data, message }, { status });
};

export const errorResponse = (
  error: string = "Something went wrong, try again later.",
  status: number = 500
) => {
  return NextResponse.json({ error }, { status });
};

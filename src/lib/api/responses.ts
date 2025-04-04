import { NextResponse } from "next/server";

export const successResponse = <T>(
  data: T,
  message: string = "Success",
  status: number = 200
) => {
  return NextResponse.json({ data, message, status }, { status });
};

export const errorResponse = (
  error: string = "Something went wrong, try again later.",
  status: number = 500
) => {
  return NextResponse.json({ error, status }, { status });
};

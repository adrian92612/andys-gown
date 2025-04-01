import { ApiResponse, ErrorResponse } from "./types";

export type ErrorType = {
  status: number;
  error: {
    message: string[];
  };
};

export const fetcher = async <T>(
  input: RequestInfo,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const res = await fetch(input, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => {});
    throw {
      error: errorBody?.error || "API Error",
    } satisfies ErrorResponse;
  }

  return res.json();
};

export const createPostEndpoint = <TBody, TResponse = unknown>(url: string) => {
  return {
    post: (body?: TBody) =>
      fetcher<TResponse>(url, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      }),
  };
};

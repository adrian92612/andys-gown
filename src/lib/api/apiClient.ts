import { ApiResponse, ErrorResponse } from "./types";

export const fetcher = async <T>(
  input: RequestInfo,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const isFormData = options.body instanceof FormData;
  const res = await fetch(input, {
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => {});
    throw {
      error: errorBody?.error || "API Error",
      status: errorBody.status,
    } satisfies ErrorResponse;
  }

  return res.json();
};

export const createPostEndpoint = <TBody, TResponse = unknown>(url: string) => {
  return {
    post: (body?: TBody | FormData) =>
      fetcher<TResponse>(url, {
        method: "POST",
        body:
          body instanceof FormData
            ? body
            : body
            ? JSON.stringify(body)
            : undefined,
      }),
  };
};

export const createDeleteEndpoint = <TResponse = unknown>(url: string) => {
  return {
    delete: () =>
      fetcher<TResponse>(url, {
        method: "DELETE",
      }),
  };
};

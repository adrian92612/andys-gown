export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type ErrorResponse = {
  error: string;
};

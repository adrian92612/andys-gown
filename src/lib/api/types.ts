export type ApiResponse<T> = {
  data: T;
  message: string;
  status: number;
};

export type ErrorResponse = {
  error: string;
  status: number;
};

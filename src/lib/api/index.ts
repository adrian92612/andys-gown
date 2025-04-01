import { User } from "@prisma/client";
import { LoginSchemaType } from "../zod/auth";
import { createPostEndpoint } from "./apiClient";

export const api = {
  auth: {
    login: createPostEndpoint<LoginSchemaType, User>("/api/auth/login"),
    logout: createPostEndpoint("/api/auth/logout"),
  },
};

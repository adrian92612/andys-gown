import { Gown, User } from "@prisma/client";
import { LoginSchemaType } from "../zod/auth";
import { createDeleteEndpoint, createPostEndpoint } from "./apiClient";
import { CreateGownSchemaType } from "../zod/gown";

export const api = {
  auth: {
    login: createPostEndpoint<LoginSchemaType, User>("/api/auth/login"),
    logout: createPostEndpoint("/api/auth/logout"),
  },
  gown: {
    createGown: createPostEndpoint<CreateGownSchemaType, Gown>("/api/gowns"),
  },
  cloudinary: {
    deleteImage: (publicId: string) =>
      createDeleteEndpoint(`/api/cloudinary-image?publicId=${publicId}`),
  },
};

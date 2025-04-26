import { Booking, Gown, User } from "@prisma/client";
import { LoginSchemaType } from "../zod/auth";
import {
  createDeleteEndpoint,
  createPatchEndpoint,
  createPostEndpoint,
} from "./apiClient";
import { GownSchemaType } from "../zod/gown";
import { BookingSchemaType } from "../zod/booking";
import { apiRoute } from "../../constants/routes";

export const api = {
  auth: {
    login: createPostEndpoint<LoginSchemaType, User>(apiRoute.auth.login),
    logout: createPostEndpoint(apiRoute.auth.logout),
  },
  gown: {
    createGown: createPostEndpoint<GownSchemaType, Gown>(apiRoute.gown.base),
    updateGown: (gownId: string) =>
      createPatchEndpoint(apiRoute.gown.update(gownId)),
    deleteGown: (gownId: string) =>
      createDeleteEndpoint(apiRoute.gown.delete(gownId)),
  },
  booking: {
    createBooking: createPostEndpoint<BookingSchemaType, Booking>(
      apiRoute.booking.base
    ),
    updateBooking: (bookingId: string) =>
      createPatchEndpoint(apiRoute.booking.update(bookingId)),
    deleteBooking: (bookingId: string) =>
      createDeleteEndpoint(apiRoute.booking.delete(bookingId)),
  },
  cloudinary: {
    deleteImage: (publicId: string) =>
      createDeleteEndpoint(apiRoute.image.delete(publicId)),
  },
};

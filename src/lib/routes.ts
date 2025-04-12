export const route = {
  home: "/",
  collections: "/collections",
  login: "/login",
  dashboard: "/dashboard/overview",
  gowns: "/dashboard/gowns",
  bookings: "/dashboard/bookings",
  newGown: "/dashboard/gowns/new",
  newBooking: (gownId?: string) => `/dashboard/bookings/new?gown=${gownId}`,
  editGown: (id: string) => `/dashboard/gowns/${id}/edit`,
  editBooking: (id: string) => `/dashboard/bookings/${id}/edit`,
  gownDetails: (id: string) => `/dashboard/gowns/${id}`,
  bookingDetails: (id: string) => `/dashboard/bookings/${id}`,
};

export const apiRoute = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
  },
  gown: {
    base: "/api/gowns",
    update: (id: string) => `/api/gowns/${id}`,
    delete: (id: string) => `/api/gowns/${id}`,
  },
  booking: {
    base: "/api/bookings",
    update: (id: string) => `/api/bookings/${id}`,
    delete: (id: string) => `/api/bookings/${id}`,
  },
  image: {
    delete: (publicId: string) => `/api/cloudinary-image?publicId=${publicId}`,
  },
};

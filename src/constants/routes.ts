export const route = {
  home: "/home",
  collections: "/collections",
  termsAndConditions: "terms-and-conditions",
  login: "/login",
  baseDashboard: "/dashboard",
  dashboard: "/dashboard/overview",
  gowns: "/dashboard/gowns",
  bookings: "/dashboard/bookings",
  newGown: "/dashboard/gowns/new",
  newBooking: (gownId?: string) =>
    gownId
      ? `/dashboard/bookings/new?gown=${gownId}`
      : "/dashboard/bookings/new",
  editGown: (gownId: string) => `/dashboard/gowns/${gownId}/edit`,
  editBooking: (bookingId: string) => `/dashboard/bookings/${bookingId}/edit`,
  gownDetails: (gownId: string) => `/dashboard/gowns/${gownId}`,
  bookingDetails: (bookingId: string) => `/dashboard/bookings/${bookingId}`,
  siteGownDetails: (gownId: string) => `/collections/${gownId}`,
};

export const homeRoute = [
  {
    href: `${route.home}/#about`,
    label: "About",
  },
  {
    href: `${route.home}/#how-it-works`,
    label: "How It Works",
  },
  {
    href: `${route.home}/#faqs`,
    label: "FAQs",
  },
  {
    href: `${route.home}/#contact`,
    label: "Contact Us",
  },
];

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

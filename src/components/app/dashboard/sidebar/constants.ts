import { route } from "@/lib/routes";

type Link = {
  label: string;
  href: string;
};

export const links: Link[] = [
  {
    label: "Overview",
    href: route.dashboard,
  },
  {
    label: "Gowns",
    href: route.gowns,
  },
  {
    label: "Bookings",
    href: route.bookings,
  },
];

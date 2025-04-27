import { route } from "@/constants/routes";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { GiAmpleDress } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";

type Link = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const links: Link[] = [
  {
    label: "Overview",
    href: route.dashboard,
    icon: <MdSpaceDashboard className="size-6" />,
  },
  {
    label: "Gowns",
    href: route.gowns,
    icon: <GiAmpleDress className="size-6" />,
  },
  {
    label: "Bookings",
    href: route.bookings,
    icon: <FaBook className="size-6" />,
  },
  {
    label: "Maison",
    href: route.home,
    icon: <CgWebsite className="size-6" />,
  },
];

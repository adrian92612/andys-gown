"use client";

import { usePathname } from "next/navigation";
import { route } from "../routes";

export const useIsOnDashboard = () => {
  const pathname = usePathname();
  const isOnDashboard =
    typeof pathname === "string" &&
    [route.baseDashboard, route.login].some((s) => pathname.startsWith(s));

  return { isOnDashboard };
};

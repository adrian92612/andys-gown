"use client";

import { usePathname } from "next/navigation";

export const useIsActivePath = (route: string) => {
  const pathname = usePathname();
  const isActivePath = pathname.startsWith(route);
  return { isActivePath };
};

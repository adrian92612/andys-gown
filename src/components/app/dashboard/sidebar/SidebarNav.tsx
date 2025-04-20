"use client";

import { links } from "./constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsActivePath } from "@/lib/hooks/useIsActivePath";

type Props = {
  label: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export const SidebarLink = ({ label, href, icon, onClick }: Props) => {
  const { isActivePath } = useIsActivePath(href);

  return (
    <li>
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full rounded-none justify-start gap-4 font-semibold text-lg",
            "hover:bg-dashboard-spaceWhite hover:text-dashboard-deepBlueSpace",
            isActivePath && "bg-dashboard-secondary text-dashboard-primary"
          )}
          onClick={onClick}
        >
          {icon} {label}
        </Button>
      </Link>
    </li>
  );
};

type SidebarNavProps = {
  forMobile?: boolean;
  closeSheet?: () => void;
};

export const SidebarNav = ({
  forMobile = false,
  closeSheet,
}: SidebarNavProps) => {
  return (
    <nav className={cn(forMobile && "pt-10")}>
      <ul>
        {links &&
          !!links.length &&
          links.map((i, idx) => (
            <SidebarLink
              key={idx}
              label={i.label}
              href={i.href}
              icon={i.icon}
              onClick={closeSheet}
            />
          ))}
      </ul>
    </nav>
  );
};

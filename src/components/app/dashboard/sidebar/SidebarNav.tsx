"use client";

import { usePathname } from "next/navigation";
import { links } from "./constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href: string;
  currentPath: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export const SidebarLink = ({
  label,
  href,
  currentPath,
  icon,
  onClick,
}: Props) => {
  const isActive = currentPath.startsWith(href);

  return (
    <li>
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full rounded-none justify-start gap-4 font-semibold text-lg",
            "hover:bg-dashboard-spaceWhite hover:text-dashboard-deepBlueSpace",
            isActive && "bg-dashboard-secondary text-dashboard-primary"
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
  const currentPath = usePathname();

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
              currentPath={currentPath}
              onClick={closeSheet}
            />
          ))}
      </ul>
    </nav>
  );
};

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
};

export const SidebarLink = ({ label, href, currentPath }: Props) => {
  const isActive = currentPath.startsWith(href);

  return (
    <li>
      <Link href={href}>
        <Button variant="ghost" className={cn(isActive && "bg-amber-300")}>
          {label}
        </Button>
      </Link>
    </li>
  );
};

export const SidebarNav = () => {
  const currentPath = usePathname();

  return (
    <nav>
      <ul>
        {links &&
          !!links.length &&
          links.map((i, idx) => (
            <SidebarLink
              key={idx}
              label={i.label}
              href={i.href}
              currentPath={currentPath}
            />
          ))}
      </ul>
    </nav>
  );
};

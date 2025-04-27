"use client";

import { Button } from "@/components/ui/button";
import { cn, formatCategory } from "@/lib/utils";
import { CategoryWithAll } from "./CollectionsGownGrid";

type CategoryBtnProps = {
  value: CategoryWithAll;
  category: CategoryWithAll;
  handleClick: (value: CategoryWithAll) => void;
};

export const CategoryBtn = ({
  value,
  category,
  handleClick,
}: CategoryBtnProps) => {
  const formatted = value !== "All" ? formatCategory(value) : "All";
  return (
    <Button
      variant="ghost"
      onClick={() => handleClick(value)}
      className={cn(
        "text-site-text-light font-bold text-base rounded-none transition duration-300 hover:bg-site-primary",
        value === category && "bg-site-primary border-site-primary"
      )}
    >
      {formatted}
    </Button>
  );
};

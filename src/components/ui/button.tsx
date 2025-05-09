import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-dashboard-primary text-dashboard-secondary hover:bg-dashboard-primary/80",
        destructive:
          "bg-dashboard-danger text-dashboard-secondary hover:bg-dashboard-danger/80 focus-visible:ring-red-900",
        outline:
          "border-dashboard-primary border hover:bg-dashboard-primary/10",
        outlineSecondary:
          "border-dashboard-secondary text-dashboard-secondary border hover:bg-secondary-primary/10",
        secondary:
          "bg-dashboard-secondary text-dashboard-primary shadow-xs hover:bg-dashboard-secondary/80",
        ghost: "hover:bg-dashboard-secondary/10",
        link: "text-dashboard-primary underline-offset-4 hover:underline",
        columnHeader: "hover:bg-dashboard-secondary/20 justify-start p-0",
      },
      size: {
        default: "h-9 px-4",
        icon: "size-9",
        columnHeader: "p-0 w-full pl-2 h-full rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

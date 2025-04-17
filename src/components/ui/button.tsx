import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-200 hover:bg-slate-900/80",
        destructive:
          "bg-red-600 text-slate-200 hover:bg-red-600/80 focus-visible:ring-red-900",
        outline: "border-slate-900 border hover:bg-slate-900/10",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-slate-200/10",
        link: "text-primary underline-offset-4 hover:underline",
        columnHeader: "hover:bg-red-900 justify-start p-0",
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

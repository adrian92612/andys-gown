import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type GownStatus = "In Store" | "For Pick Up" | "On Event" | "For Return";

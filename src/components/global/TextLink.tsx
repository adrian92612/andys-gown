import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  text: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
};

export const TextLink = ({ text, href, icon, className }: Props) => {
  return (
    <Button
      asChild
      variant="link"
      className={cn("p-0 text-inherit text-base h-fit gap-1", className)}
    >
      <Link href={href} target="_blank">
        {text} {icon && icon}
      </Link>
    </Button>
  );
};

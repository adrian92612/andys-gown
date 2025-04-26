import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  text: React.ReactNode;
  href: string;
  className?: string;
  target?: "_blank" | "_self";
};

export const TextLink = ({
  text,
  href,
  className,
  target = "_blank",
}: Props) => {
  return (
    <Button
      asChild
      variant="link"
      className={cn(
        "p-0 text-inherit text-base h-fit gap-1 hover:text-site-primary",
        className
      )}
    >
      <Link href={href} target={target} rel="noopener noreferrer">
        {text}
      </Link>
    </Button>
  );
};

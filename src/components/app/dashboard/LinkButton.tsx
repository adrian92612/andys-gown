import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiEditFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

type IconType = keyof typeof icons;

type Props = {
  label: string;
  href: string;
  className?: string;
  icon?: IconType;
} & Pick<VariantProps<typeof buttonVariants>, "variant">;

const icons = {
  edit: <RiEditFill className="size-5 text-inherit" />,
  add: <MdAdd className="size-5 text-inherit" />,
  view: <CiViewList className="size-5 text-inherit" />,
};

export const LinkButton = ({
  label,
  href,
  className,
  icon,
  variant = "default",
}: Props) => {
  return (
    <Link href={href}>
      <Button variant={variant} className={className}>
        {icon && icons[icon]} {label}
      </Button>
    </Link>
  );
};

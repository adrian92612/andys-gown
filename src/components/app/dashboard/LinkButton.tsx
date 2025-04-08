import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiEditFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

type IconType = keyof typeof icons;

type Props = {
  label: string;
  href: string;
  className?: string;
  icon?: IconType;
};

const icons = {
  edit: <RiEditFill />,
  add: <MdAdd />,
  view: <CiViewList />,
};

export const LinkButton = ({ label, href, className, icon }: Props) => {
  return (
    <Link href={href} className={className}>
      <Button>
        {icon && icons[icon]} {label}
      </Button>
    </Link>
  );
};

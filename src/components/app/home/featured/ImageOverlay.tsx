"use client";

import { route } from "@/constants/routes";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export const ImageOverlay = ({ id }: Props) => {
  const { push } = useRouter();
  const openGownDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    push(route.siteGownDetails(id));
  };
  return (
    <div
      onClick={openGownDetails}
      className="absolute inset-0 bg-site-text/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:cursor-pointer"
    >
      <span className="text-2xl text-site-text-light">View Full Details</span>
    </div>
    // <div
    //   onClick={openGownDetails}
    //   className="absolute inset-0 bg-site-text/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    // >
    //   <Button
    //     asChild
    //     variant="link"
    //     onClick={(e) => e.stopPropagation()}
    //     className="p-0 text-2xl text-site-text-light hover:text-site-primary absolute top-10 right-10"
    //   >
    //     <Link href={route.siteGownDetails(id)} target="_blank">
    //       Gown Details <HiArrowLongRight />
    //     </Link>
    //   </Button>
    // </div>
  );
};

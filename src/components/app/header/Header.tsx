import { Navbar } from "./Navbar";
import Image from "next/image";
import { images } from "@/constants/images";

export const Header = () => {
  return (
    <header className="w-full h-14 bg-site-background/95 backdrop-blur-xs flex items-center justify-between px-4 sm:px-10 border-b border-site-border font-heading sticky top-0 z-10 gap-5">
      <Image
        src={images.logoDark}
        alt="Andy's Gown Logo"
        width={80}
        height={80}
        className="object-contain aspect-auto"
      />
      <Navbar />
      <div className="hidden: xs:block size-20" />
    </header>
  );
};

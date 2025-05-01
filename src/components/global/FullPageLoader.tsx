import { images } from "@/constants/images";
import Image from "next/image";

export const FullPageLoader = () => {
  return (
    <div className="absolute inset-0 z-50 bg-site-background grid place-items-center">
      <div>
        <Image
          src={images.logoDark}
          alt="Andys Gown Logo"
          width={300}
          height={150}
          className="animate-pulse mb-10"
        />
        <p className="text-lg text-center font-medium tracking-wide animate-pulse text-site-text">
          Dressing the page for you...
        </p>
      </div>
    </div>
  );
};

import { images } from "@/constants/images";
import Image from "next/image";

const AboutText = () => {
  return (
    <div className="w-[300px] mx-auto flex flex-col gap-5 justify-center h-full">
      <h1 className="font-extrabold text-2xl">
        At Andy&apos;s Gown Rental, we believe every moment deserves elegance.
      </h1>

      <div className="sm:w-[430px] md:w-[455px] space-y-5">
        <p>
          Each gown in our collection is handpicked for its detail, silhouette,
          and timeless beauty — made to be worn, remembered, and loved.
        </p>
        <p>
          From intimate gatherings to grand celebrations, we offer a curated
          experience where every woman can find a gown that speaks to her.
        </p>
        <p className="font-bold">
          Because when the dress is right, the moment becomes unforgettable.
        </p>
        <p className="italic text-sm mt-6">— Andy, Founder & Curator</p>
      </div>
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section
      id="about"
      className=" w-full max-w-3xl grid mx-auto grid-cols-1 sm:grid-cols-2 py-12 gap-5"
    >
      <div className="relative order-1 sm:order-none z-[1]">
        <AboutText />
      </div>
      <div className="relative w-full max-w-[380px] mx-auto sm:ml-auto aspect-[4/5]">
        <Image
          src={images.aboutImage}
          alt="about-image"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import { route } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section
      id="welcome"
      className="relative max-h-[700px] h-dvh 2xl:max-h-[1000px] w-full"
    >
      <Image
        src={images.heroImage}
        alt="hero image of gown"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-site-text-light bg-site-text/80">
        <h1 className="text-4xl md:text-6xl font-heading">
          A Gown for Every Story
        </h1>
        <p className="mt-4 text-lg">
          Curated gowns for life&apos;s most unforgettable moments.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-6 text-base h-12 font-bold rounded-none text-bold border-site-text-light tracking-wide hover:bg-site-primary hover:border-site-primary transition"
        >
          <Link href={route.collections}>Browse Collections</Link>
        </Button>
      </div>
    </section>
  );
};

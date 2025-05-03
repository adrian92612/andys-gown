import { images } from "@/constants/images";
import Image from "next/image";
import { TextLink } from "./TextLink";
import { route } from "@/constants/routes";
import { Separator } from "../ui/separator";

export const NotFoundBlock = () => {
  return (
    <section className="grid place-items-center h-dvh">
      <div className="flex flex-col items-center gap-5 text-center">
        <Image
          src={images.logoDark}
          alt="Andys Gown Logo"
          width={200}
          height={100}
        />

        <div>
          <h1 className="text-3xl font-semibold mb-2">
            A misstep on the runway.
          </h1>
          <p className="text-site-text/80 max-w-md">
            We couldn&apos;t find the page you were looking for. Let&apos;s
            guide you back to elegance.
          </p>
        </div>
        <div className="flex items-center h-9 gap-5">
          <TextLink
            href={route.home}
            text="MAISON"
            target="_self"
            className="text-2xl font-bold"
          />
          <Separator orientation="vertical" className="bg-site-text" />
          <TextLink
            href={route.collections}
            text="COLLECTIONS"
            target="_self"
            className="text-2xl font-bold"
          />
        </div>
      </div>
    </section>
  );
};

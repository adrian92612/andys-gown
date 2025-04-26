import { Button } from "@/components/ui/button";
import { FaFacebookMessenger, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { images } from "@/constants/images"; // optional if you want a background image
import Link from "next/link";
import { siteDetails } from "@/constants/site-details";

export const ContactUsSection = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 min-h-[600px] text-site-text-light flex flex-col justify-center"
    >
      <div className="absolute inset-0">
        <Image
          src={images.contactBg}
          alt="curtain"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" />
      </div>
      <div className="max-w-3xl mx-auto px-6 text-center py-10 flex flex-col items-center gap-8 relative">
        <div>
          <h2 className="text-4xl font-heading text-site-primary">
            Let&apos;s Create Your Moment
          </h2>
          <p className="text-sm italic text-site-text-light/70">
            Crafting timeless moments, one gown at a time.
          </p>
        </div>
        <p className="text-lg leading-relaxed max-w-[500px] text-center">
          For inquiries, gown fittings, and reservations, send us a direct
          message on Facebook or Instagram.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Button
            asChild
            variant="outline"
            className="text-base font-extrabold h-12 rounded-none border-site-background tracking-wide hover:bg-site-primary hover:border-site-primary transition transform hover:scale-105 hover:shadow-md"
          >
            <Link
              href="https://m.me/yourFacebookPageUsername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookMessenger className="mr-2 size-5" />
              Message on Facebook
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-base font-extrabold h-12 rounded-none border-site-background tracking-wide hover:bg-site-primary hover:border-site-primary transition transform hover:scale-105 hover:shadow-md"
          >
            <Link
              href="https://www.instagram.com/yourInstagramUsername/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="mr-2 size-5" />
              Message on Instagram
            </Link>
          </Button>
        </div>
        <hr className="w-32 border-t-2 border-site-primary/70 my-4" />
        <div className="text-sm leading-relaxed flex flex-col text-site-text-light/70">
          <p>Visit us at:</p>
          <p>{siteDetails.address}</p>
          <p>- {siteDetails.notice} -</p>
          <p>{siteDetails.hours}</p>
        </div>
      </div>
    </section>
  );
};

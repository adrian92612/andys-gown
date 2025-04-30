import Image from "next/image";
import { images } from "@/constants/images";
import { siteDetails } from "@/constants/site-details";
import { SocialMediaMsgBtn } from "@/components/global/SocialMediaMsgBtn";

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
        <SocialMediaMsgBtn />
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

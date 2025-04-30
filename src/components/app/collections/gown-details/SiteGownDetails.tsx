import { Prisma } from "@prisma/client";
import { ImageGallery } from "./ImageGallery";
import { GownDetails } from "./GownDetails";
import { SocialMediaMsgBtn } from "@/components/global/SocialMediaMsgBtn";
import { route } from "@/constants/routes";
import { ShareButtons } from "@/components/global/ShareButtons";

type Props = {
  gown: Prisma.GownGetPayload<{
    include: {
      images: {
        select: {
          id: true;
          url: true;
        };
      };
      bookings: {
        select: {
          pickUpDate: true;
          eventDate: true;
          returnDate: true;
        };
      };
    };
  }>;
};

export const SiteGownDetails = ({ gown }: Props) => {
  return (
    <section className="h-full bg-site-text/95 text-site-text-light px-4 sm:px-8 py-10">
      <div className="grid md:grid-cols-2 gap-5 max-w-7xl mx-auto ">
        <ImageGallery images={gown.images} />
        <div className="flex flex-col justify-center gap-10 mx-auto">
          <GownDetails gown={gown} />
          <div className="flex flex-col gap-5">
            <p className="max-w-96">
              Rentals come fully prepped: cleaned, steamed, and packed for
              pickup. DM us now to schedule your booking.
            </p>
            <SocialMediaMsgBtn />

            <ShareButtons fallbackUrl={route.siteGownDetails(gown.id)} />
          </div>
        </div>
      </div>
    </section>
  );
};

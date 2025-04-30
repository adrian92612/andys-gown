import Link from "next/link";
import { Button } from "../ui/button";
import { FaFacebookMessenger, FaInstagram } from "react-icons/fa";
import { socialMediaUrls } from "@/constants/social-media";

export const SocialMediaMsgBtn = () => {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      <Button
        asChild
        variant="outline"
        className="text-base font-extrabold h-12 rounded-none border-site-background tracking-wide hover:bg-site-primary hover:border-site-primary transition transform hover:scale-105 hover:shadow-md"
      >
        <Link
          href={socialMediaUrls.facebook}
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
          href={socialMediaUrls.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="mr-2 size-5" />
          Message on Instagram
        </Link>
      </Button>
    </div>
  );
};

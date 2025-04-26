import { TextLink } from "@/components/global/TextLink";
import { homeRoute, route } from "@/constants/routes";
import { socialMediaUrls } from "@/constants/social-media";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BsExclamationTriangle } from "react-icons/bs";
import { TbClockHour8 } from "react-icons/tb";
import { siteDetails } from "@/constants/site-details";

export const Footer = () => {
  return (
    <footer className="px-4 sm:px-8 py-12 bg-site-text mt-[2px] text-site-text-light space-y-10">
      <div className="w-full max-w-4xl mx-auto flex flex-col xs:flex-row gap-10 justify-between">
        <div className="flex flex-col items-start">
          <TextLink
            href={`${route.home}/#welcome`}
            text="Maison"
            target="_self"
          />
          {!!homeRoute.length &&
            homeRoute.map((r, i) => (
              <TextLink key={i} href={r.href} text={r.label} target="_self" />
            ))}
          <TextLink href={route.collections} text="Collections" />
        </div>
        <div className="flex flex-col justify-between gap-5">
          <div className="flex flex-col items-start">
            <TextLink
              href={socialMediaUrls.facebook}
              text={
                <>
                  <FaFacebook className="size-5" /> Facebook
                </>
              }
              className="gap-3"
            />
            <TextLink
              href={socialMediaUrls.instagram}
              text={
                <>
                  <FaInstagram className="size-5" /> Instagram
                </>
              }
              className="gap-3"
            />
          </div>
          <div className="flex flex-col gap-2 text-site-text-light">
            <div className="flex items-center gap-3">
              <CiLocationOn className="size-5" />
              <span>{siteDetails.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <BsExclamationTriangle className="size-5" />
              <p>{siteDetails.notice}</p>
            </div>
            <div className="flex items-center gap-3">
              <TbClockHour8 className="size-5" />
              <p>{siteDetails.hours}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-32 mx-auto border-t-2 border-site-primary/70" />
      <p className="text-center">
        © 2025 Andy&apos;s Gown Rental. All rights reserved.
      </p>
    </footer>
  );
};

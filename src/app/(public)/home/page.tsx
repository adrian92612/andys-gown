import { AboutSection } from "@/components/app/home/about/AboutSection";
import { ContactUsSection } from "@/components/app/home/contact-us/ContactUs";
import { FAQsSection } from "@/components/app/home/faqs/FAQsSection";
import { FeaturedSection } from "@/components/app/home/featured/FeaturedSection";
import { HeroSection } from "@/components/app/home/hero/HeroSection";
import { HowItWorks } from "@/components/app/home/how-it-works/HowItWorks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maison",
};

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <HowItWorks />
      <FAQsSection />
      <ContactUsSection />
    </>
  );
};

export default HomePage;

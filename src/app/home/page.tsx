import { AboutSection } from "@/components/app/home/about/AboutSection";
import { ContactUsSection } from "@/components/app/home/contact-us/ContactUs";
import { FAQsSection } from "@/components/app/home/faqs/FAQsSection";
import { FeaturedSection } from "@/components/app/home/featured/FeaturedSection";
import { Footer } from "@/components/app/home/footer/Footer";
import { HeroSection } from "@/components/app/home/hero/HeroSection";
import { HowItWorks } from "@/components/app/home/how-it-works/HowItWorks";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <HowItWorks />
      <FAQsSection />
      <ContactUsSection />
      <Footer />
    </>
  );
};

export default HomePage;

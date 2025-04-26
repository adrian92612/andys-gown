import { AboutSection } from "@/components/app/home/about/AboutSection";
import { FeaturedSection } from "@/components/app/home/featured/FeaturedSection";
import { HeroSection } from "@/components/app/home/hero/HeroSection";
import { HowItWorks } from "@/components/app/home/how-it-works/HowItWorks";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <HowItWorks />
    </>
  );
};

export default HomePage;

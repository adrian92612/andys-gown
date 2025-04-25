import { AboutSection } from "@/components/app/home/about/AboutSection";
import { FeaturedSection } from "@/components/app/home/featured/FeaturedSection";
import { HeroSection } from "@/components/app/home/hero/HeroSection";

const HomePage = async () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
    </>
  );
};

export default HomePage;

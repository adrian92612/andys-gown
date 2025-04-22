import { FeaturedSection } from "@/components/app/home/featured/FeaturedSection";
import { HeroSection } from "@/components/app/home/hero/HeroSection";

const HomePage = async () => {
  return (
    <div className="h-[200dvh]">
      <HeroSection />
      <FeaturedSection />
    </div>
  );
};

export default HomePage;

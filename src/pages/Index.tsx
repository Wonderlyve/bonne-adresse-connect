
import SearchSection from "@/components/SearchSection";
import FeaturedProviders from "@/components/FeaturedProviders";
import HeroAds from "@/components/HeroAds";
import { usePageReset } from "@/hooks/usePageReset";

const Index = () => {
  usePageReset();

  return (
    <div className="min-h-screen">
      <SearchSection />
      <div className="max-w-7xl mx-auto px-4">
        <HeroAds />
      </div>
      <FeaturedProviders />
      
      {/* Mobile padding to account for bottom navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Index;

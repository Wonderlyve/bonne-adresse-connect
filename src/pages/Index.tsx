import SearchSection from "@/components/SearchSection";
import FeaturedProviders from "@/components/FeaturedProviders";
import FeaturedServices from "@/components/FeaturedServices";
import { usePageReset } from "@/hooks/usePageReset";

const Index = () => {
  usePageReset();

  return (
    <div className="min-h-screen">
      <SearchSection />
      <FeaturedProviders />
      <FeaturedServices />
      
      {/* Mobile padding to account for bottom navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Index;

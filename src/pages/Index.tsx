
import { useEffect } from "react";
import SearchSection from "@/components/SearchSection";
import FeaturedProviders from "@/components/FeaturedProviders";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SearchSection />
      <FeaturedProviders />
      
      {/* Mobile padding to account for bottom navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Index;


import SearchSection from "@/components/SearchSection";
import FeaturedProviders from "@/components/FeaturedProviders";
import ServicesSection from "@/components/ServicesSection";
import DesignersSection from "@/components/DesignersSection";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <SearchSection />
      <ServicesSection />
      <FeaturedProviders />
      <DesignersSection />
      
      {/* Mobile padding to account for bottom navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Index;

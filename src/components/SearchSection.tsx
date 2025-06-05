
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Zap } from "lucide-react";

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    if (location.trim()) {
      params.append('location', location.trim());
    }
    
    navigate(`/providers?${params.toString()}`);
  };

  const handleQuickService = () => {
    navigate('/services');
  };

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-xl shadow-lg border border-gray-200/50">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Que recherchez-vous ? (ex: impression flyers, logo design...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Où ? (Ville, code postal...)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transform transition-all duration-200 hover:scale-105 shadow-md text-sm whitespace-nowrap"
            >
              Rechercher
            </Button>
            <Button 
              type="button"
              onClick={handleQuickService}
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform transition-all duration-200 hover:scale-105 shadow-md text-sm whitespace-nowrap"
            >
              <Zap className="h-4 w-4 mr-1" />
              Rapide
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;


import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchSection = () => {
  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-xl shadow-lg border border-gray-200/50">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Que recherchez-vous ? (ex: impression flyers, logo design...)"
                className="w-full pl-10 pr-3 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Où ? (Ville, code postal...)"
              className="w-full px-3 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
            />
          </div>
          <Button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transform transition-all duration-200 hover:scale-105 shadow-md text-sm">
            Rechercher
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;

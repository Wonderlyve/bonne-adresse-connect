
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Que cherchez-vous ?
        </h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-xl border border-gray-200/50">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Que recherchez-vous ? (ex: impression flyers, logo design...)"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Où ? (Ville, code postal...)"
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
          <Button className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transform transition-all duration-200 hover:scale-105 shadow-lg">
            Rechercher
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;

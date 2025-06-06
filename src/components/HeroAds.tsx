
import { useAds } from "@/hooks/useAds";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const HeroAds = () => {
  const { ads, loading } = useAds();

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 h-48 rounded-lg mb-8"></div>
    );
  }

  const heroAds = ads.filter(ad => ad.position === 'hero');

  if (heroAds.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {heroAds.map((ad) => (
        <Card key={ad.id} className="overflow-hidden bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                {ad.image_url && (
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{ad.title}</h3>
                  <p className="text-gray-600">{ad.description}</p>
                </div>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
              >
                <a href={ad.link_url} target="_blank" rel="noopener noreferrer">
                  Découvrir
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HeroAds;

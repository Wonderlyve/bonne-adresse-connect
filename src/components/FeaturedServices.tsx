import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Service {
  id: string;
  title: string;
  description: string;
  images: string[];
  price_min: number;
  price_max: number | null;
  category: string;
  delivery_time: string;
  provider_id: string;
  provider?: {
    company_name: string;
    avatar_url: string;
  };
}

const FeaturedServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data: articles, error } = await supabase
        .from('provider_articles')
        .select(`
          *,
          provider:profiles!provider_articles_provider_id_fkey(
            company_name,
            avatar_url
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      // Transform image paths to public URLs
      const servicesWithUrls = (articles || []).map(article => ({
        ...article,
        images: (article.images || []).map((imagePath: string) => {
          const { data } = supabase.storage
            .from('article-images')
            .getPublicUrl(imagePath);
          return data.publicUrl;
        })
      }));

      setServices(servicesWithUrls);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (service: Service) => {
    navigate(`/provider/${service.provider_id}`);
  };

  if (loading) {
    return (
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="space-y-4">
          {[1, 2].map((row) => (
            <div key={row} className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4 min-w-[280px]">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  // Diviser les services en 2 lignes
  const servicesPerRow = 8;
  const rows = [
    services.slice(0, servicesPerRow),
    services.slice(servicesPerRow, servicesPerRow * 2)
  ].filter(row => row.length > 0);

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Services Disponibles</h2>
        <Link to="/providers">
          <Button variant="outline">Voir tout</Button>
        </Link>
      </div>
      {services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun service disponible pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {rows.map((rowServices, rowIndex) => (
            <div key={rowIndex}>
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {rowServices.map((service) => (
                    <CarouselItem key={service.id} className="pl-2 md:pl-4 basis-11/12 sm:basis-5/12 lg:basis-1/4">
                      <div 
                        className="group hover:shadow-lg transition-shadow cursor-pointer rounded-lg overflow-hidden bg-white border h-full"
                        onClick={() => handleServiceClick(service)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={service.images?.[0] || "/placeholder.svg"}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <Badge className="absolute top-2 right-2">
                            {service.category}
                          </Badge>
                        </div>
                        
                        <div className="p-4">
                          <div className="mb-2">
                            <h3 className="font-semibold text-lg line-clamp-1">{service.title}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">4.8</span>
                              <span>(128 avis)</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <img
                              src={service.provider?.avatar_url || "/placeholder.svg"}
                              alt={service.provider?.company_name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="line-clamp-1">{service.provider?.company_name}</span>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                            <Clock className="w-4 h-4" />
                            <span>{service.delivery_time}</span>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t">
                            <span className="text-lg font-bold text-primary">
                              {service.price_max 
                                ? `${service.price_min}€ - ${service.price_max}€`
                                : `À partir de ${service.price_min}€`
                              }
                            </span>
                            <Button size="sm">
                              Voir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedServices;

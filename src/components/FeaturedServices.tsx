import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Clock, Star } from "lucide-react";

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

      setServices(articles || []);
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
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Services Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Services Disponibles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les services proposés par nos prestataires
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleServiceClick(service)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.images?.[0] || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4">
                  {service.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-1">{service.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <img
                    src={service.provider?.avatar_url || "/placeholder.svg"}
                    alt={service.provider?.company_name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{service.provider?.company_name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{service.delivery_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center pt-4 border-t">
                <div className="text-lg font-bold">
                  {service.price_max 
                    ? `${service.price_min}€ - ${service.price_max}€`
                    : `À partir de ${service.price_min}€`
                  }
                </div>
                <Button size="sm" variant="default">
                  Voir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/providers')}
          >
            Voir tous les services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;

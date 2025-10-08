
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, MessageCircle, ShoppingCart } from "lucide-react";
import { Service } from "@/hooks/useServices";

interface ServiceCardProps {
  service: Service;
  onContact: (providerId: string) => void;
  onOrder: (service: Service) => void;
}

const ServiceCard = ({ service, onContact, onOrder }: ServiceCardProps) => {
  const rating = 4.8; // Mock rating
  const reviewCount = 24; // Mock review count

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.images?.[0] || '/placeholder.svg'}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90">
              {service.category?.name || 'Service'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold mb-2 line-clamp-2">
          {service.title}
        </CardTitle>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
            <span className="ml-1 text-sm text-gray-500">({reviewCount})</span>
          </div>
        </div>
        
        {service.provider && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {service.provider.full_name?.charAt(0)?.toUpperCase() || service.provider.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{service.provider.full_name}</p>
              <p className="text-xs text-gray-500">{service.provider.email}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Livraison: {service.delivery_time || '3-5 jours'}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold text-primary-600">
            ${service.price_min}
            {service.price_max && service.price_max !== service.price_min && 
              ` - $${service.price_max}`
            }
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => service.provider_id && onContact(service.provider_id)}
          className="flex-1"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Contacter
        </Button>
        <Button
          size="sm"
          onClick={() => onOrder(service)}
          className="flex-1"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Commander
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;

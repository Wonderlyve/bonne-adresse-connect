
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, MessageCircle } from "lucide-react";
import { Service } from "@/hooks/useServices";

interface ServiceCardProps {
  service: Service;
  onContact?: (providerId: string) => void;
  onOrder?: (service: Service) => void;
}

const ServiceCard = ({ service, onContact, onOrder }: ServiceCardProps) => {
  const formatPrice = (min: number, max: number, unit: string) => {
    if (min === max) {
      return `${min} ${unit}`;
    }
    return `${min} - ${max} ${unit}`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      {service.images && service.images.length > 0 && (
        <div className="aspect-video overflow-hidden">
          <img
            src={service.images[0]}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          <Badge variant="secondary" className="ml-2 whitespace-nowrap">
            {service.category?.name}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <img
              src={service.provider?.profile_image || "/placeholder.svg"}
              alt={service.provider?.full_name}
              className="w-5 h-5 rounded-full"
            />
            <span>{service.provider?.company_name || service.provider?.full_name}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{service.delivery_time || "À définir"}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-gray-600">4.8</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 flex items-center justify-between">
        <div className="text-lg font-bold text-primary-600">
          {formatPrice(service.price_min, service.price_max, service.price_unit)}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContact?.(service.provider_id)}
            className="flex items-center space-x-1"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Contact</span>
          </Button>
          
          <Button
            size="sm"
            onClick={() => onOrder?.(service)}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
          >
            Commander
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;

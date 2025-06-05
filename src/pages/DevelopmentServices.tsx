import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code } from "lucide-react";
import { usePageReset } from "@/hooks/usePageReset";

const DevelopmentServices = () => {
  usePageReset();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Code className="h-12 w-12 text-primary-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Services de Développement</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les meilleurs développeurs pour vos projets digitaux
          </p>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Page en développement</h2>
            <p className="text-gray-600 mb-6">
              Notre section développement sera bientôt disponible
            </p>
            <Button>Être notifié du lancement</Button>
          </CardContent>
        </Card>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default DevelopmentServices;


import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface SuspensionAlertProps {
  violationCount: number;
  onContactAdmin?: () => void;
}

const SuspensionAlert: React.FC<SuspensionAlertProps> = ({ 
  violationCount, 
  onContactAdmin 
}) => {
  return (
    <Alert className="border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-red-800">Compte suspendu</h4>
            <p className="text-red-700">
              Votre compte est suspendu suite à des violations des règles de la plateforme.
            </p>
            <p className="text-sm text-red-600 mt-1">
              Nombre de violations détectées : {violationCount}
            </p>
          </div>
          
          <div className="bg-white border border-red-200 rounded-md p-3">
            <h5 className="font-medium text-gray-900 mb-2">Violations possibles :</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Échange de contacts personnels</li>
              <li>• Tentative de paiement hors plateforme</li>
              <li>• Signalements de la part d'autres utilisateurs</li>
              <li>• Violation des conditions d'utilisation</li>
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-red-600">
              Veuillez contacter l'administration pour résoudre cette situation.
            </p>
            {onContactAdmin && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onContactAdmin}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Shield className="h-3 w-3 mr-1" />
                Contacter l'admin
              </Button>
            )}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SuspensionAlert;

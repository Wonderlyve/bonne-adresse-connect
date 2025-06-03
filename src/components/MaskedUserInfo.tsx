
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaskedUserInfoProps {
  email?: string;
  phone?: string;
  showSensitive?: boolean;
  onToggleSensitive?: () => void;
}

const MaskedUserInfo: React.FC<MaskedUserInfoProps> = ({
  email,
  phone,
  showSensitive = false,
  onToggleSensitive
}) => {
  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    return `${username.slice(0, 2)}***@${domain}`;
  };

  const maskPhone = (phone: string) => {
    if (phone.length <= 4) return '***';
    return `***${phone.slice(-4)}`;
  };

  return (
    <div className="space-y-2">
      {email && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Email:</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono">
              {showSensitive ? email : maskEmail(email)}
            </span>
            {onToggleSensitive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleSensitive}
                className="h-6 w-6 p-0"
              >
                {showSensitive ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
            )}
          </div>
        </div>
      )}
      
      {phone && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Téléphone:</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono">
              {showSensitive ? phone : maskPhone(phone)}
            </span>
            {onToggleSensitive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleSensitive}
                className="h-6 w-6 p-0"
              >
                {showSensitive ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaskedUserInfo;


import { usePageReset } from "@/hooks/usePageReset";
import { useMessages } from "@/hooks/useMessages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  usePageReset();
  
  const { conversations, loading } = useMessages();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Vos conversations avec les prestataires</p>
        </div>
        
        <Button onClick={() => navigate('/providers')}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle conversation
        </Button>
      </div>

      {conversations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune conversation
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Vous n'avez pas encore de conversations avec les prestataires
            </p>
            <Button onClick={() => navigate('/providers')}>
              Trouver des prestataires
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <Card 
              key={conversation.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/chat/${conversation.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={conversation.other_participant?.profile_image || "/placeholder.svg"}
                    alt={conversation.other_participant?.full_name || "User"}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.other_participant?.company_name || 
                       conversation.other_participant?.full_name || 
                       "Utilisateur"}
                    </h3>
                    
                    {conversation.last_message && (
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.last_message.content}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    {conversation.last_message && (
                      <p className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(conversation.last_message.created_at), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-end mt-1">
                      <Badge className="bg-blue-100 text-blue-800">
                        {conversation.type === 'order' ? 'Commande' : 'Général'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;

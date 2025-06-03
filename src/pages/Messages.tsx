
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MoreVertical, Phone, Video, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import SuspensionAlert from "@/components/SuspensionAlert";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [conversations, setConversations] = useState<any[]>([]);
  const navigate = useNavigate();
  const { profile, user, isSuspended } = useProfile();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participant1:profiles!conversations_participant1_id_fkey(*),
        participant2:profiles!conversations_participant2_id_fkey(*),
        messages(content, created_at)
      `)
      .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Erreur chargement conversations:', error);
      return;
    }

    setConversations(data || []);
  };

  const handleConversationClick = (convId: string) => {
    if (isSuspended) return;
    navigate(`/chat/${convId}`);
  };

  const getOtherParticipant = (conv: any) => {
    if (!user) return null;
    return conv.participant1_id === user.id ? conv.participant2 : conv.participant1;
  };

  const getLastMessage = (conv: any) => {
    if (!conv.messages || conv.messages.length === 0) return "Aucun message";
    return conv.messages[conv.messages.length - 1]?.content || "Aucun message";
  };

  if (isSuspended) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto p-4">
          <SuspensionAlert 
            violationCount={profile?.violation_count || 0}
            onContactAdmin={() => window.open('mailto:superadmin@super.com')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Chat List */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune conversation</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Commencez par contacter un prestataire
                  </p>
                </div>
              ) : (
                conversations.map((conv) => {
                  const otherParticipant = getOtherParticipant(conv);
                  if (!otherParticipant) return null;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleConversationClick(conv.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedChat === conv.id ? "bg-primary-50 border-l-4 border-l-primary-500" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {otherParticipant.full_name?.charAt(0) || otherParticipant.email.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {otherParticipant.full_name || otherParticipant.email}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {new Date(conv.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {getLastMessage(conv)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area - Desktop only preview */}
          <div className="lg:col-span-2 hidden lg:flex flex-col">
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Messagerie sécurisée
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Sélectionnez une conversation pour commencer à échanger de manière sécurisée avec vos prestataires.
                </p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                  <strong>Protection active :</strong> Les échanges de contacts et paiements directs sont filtrés automatiquement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Messages;

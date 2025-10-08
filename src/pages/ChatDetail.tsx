
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Mic, Image, FileText, Camera, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useMessageFilter } from "@/hooks/useMessageFilter";
import { useProfile } from "@/hooks/useProfile";
import ReportUser from "@/components/ReportUser";
import SuspensionAlert from "@/components/SuspensionAlert";
import { toast } from "sonner";

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const [canSendFiles, setCanSendFiles] = useState(false);
  const { checkMessage, isChecking } = useMessageFilter();
  const { profile, user, isSuspended } = useProfile();

  useEffect(() => {
    if (user && id) {
      loadConversation();
      loadMessages();
      checkFilePermissions();
    }
  }, [user, id]);

  const loadConversation = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participant1:profiles!conversations_participant1_id_fkey(*),
        participant2:profiles!conversations_participant2_id_fkey(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur chargement conversation:', error);
      return;
    }

    setConversation(data);
  };

  const loadMessages = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erreur chargement messages:', error);
      return;
    }

    setMessages(data || []);
  };

  const checkFilePermissions = async () => {
    if (!user) return;

    // Vérifier s'il existe une commande payée entre les participants
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'completed')
      .or(`client_id.eq.${user.id},provider_id.eq.${user.id}`)
      .limit(1);

    if (!error && data && data.length > 0) {
      setCanSendFiles(true);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !user || !id || isSuspended) return;

    // Vérifier le message avec le filtre
    const isMessageValid = await checkMessage(message.trim(), user.id);
    
    if (!isMessageValid) {
      setMessage("");
      return;
    }

    try {
      const { error } = await supabase.from('messages').insert({
        conversation_id: id,
        sender_id: user.id,
        content: message.trim(),
        message_type: 'text'
      });

      if (error) throw error;

      setMessage("");
      loadMessages(); // Recharger les messages
      toast.success("Message envoyé");
    } catch (error) {
      console.error("Erreur envoi message:", error);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  const handleFileUpload = (type: string) => {
    if (!canSendFiles) {
      toast.error("Les fichiers ne sont accessibles qu'après paiement d'une commande");
      return;
    }
    console.log(`Uploading ${type}`);
    toast.info(`Fonctionnalité d'upload ${type} en cours de développement`);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "Stopping recording" : "Starting recording");
  };

  const getOtherParticipant = () => {
    if (!conversation || !user) return null;
    
    return conversation.participant1_id === user.id 
      ? conversation.participant2 
      : conversation.participant1;
  };

  const otherParticipant = getOtherParticipant();

  if (isSuspended) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto p-4">
          <SuspensionAlert 
            violationCount={profile?.violation_count || 0}
            onContactAdmin={() => toast.info("Contactez superadmin@super.com")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/messages')}
                className="md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              {otherParticipant && (
                <>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {otherParticipant.full_name?.charAt(0) || otherParticipant.email.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {otherParticipant.full_name || otherParticipant.email}
                    </h3>
                    <p className="text-sm text-green-600">En ligne</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              {otherParticipant && (
                <ReportUser 
                  reportedUserId={otherParticipant.id}
                  reportedUserName={otherParticipant.full_name || otherParticipant.email}
                  size="sm"
                />
              )}
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {!canSendFiles && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <Lock className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-700">
                  <strong>Sécurité renforcée :</strong> L'échange de fichiers sera activé après le paiement d'une commande.
                </p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender_id === user?.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender_id === user?.id
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-900 shadow"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.sender_id === user?.id ? "text-primary-100" : "text-gray-500"}`}>
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  disabled={!canSendFiles}
                  className={!canSendFiles ? "opacity-50 cursor-not-allowed" : ""}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('photo')}
                    disabled={!canSendFiles}
                  >
                    <Camera className="h-4 w-4" />
                    <span>Photo</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('image')}
                    disabled={!canSendFiles}
                  >
                    <Image className="h-4 w-4" />
                    <span>Galerie</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('video')}
                    disabled={!canSendFiles}
                  >
                    <Video className="h-4 w-4" />
                    <span>Vidéo</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('document')}
                    disabled={!canSendFiles}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Document</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <input
              type="text"
              placeholder={isSuspended ? "Compte suspendu" : "Tapez votre message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              disabled={isSuspended || isChecking}
            />
            
            <Button 
              variant={isRecording ? "destructive" : "ghost"} 
              size="sm"
              onClick={handleVoiceRecord}
              disabled={isSuspended}
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button 
              className="px-4 py-2" 
              onClick={handleSendMessage}
              disabled={isSuspended || isChecking || !message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ChatDetail;

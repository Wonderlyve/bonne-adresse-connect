
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Mic, Image, FileText, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const conversation = {
    id: 1,
    name: "Print Express",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face",
    status: "En ligne"
  };

  const messages = [
    { id: 1, sender: "them", message: "Bonjour ! Merci pour votre commande", time: "10:00", type: "text" },
    { id: 2, sender: "me", message: "Quand sera-t-elle prête ?", time: "10:05", type: "text" },
    { id: 3, sender: "them", message: "Votre commande est prête pour le retrait", time: "10:30", type: "text" },
    { id: 4, sender: "me", message: "", time: "10:35", type: "image", content: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop" }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleFileUpload = (type: string) => {
    console.log(`Uploading ${type}`);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "Stopping recording" : "Starting recording");
  };

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
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                <p className="text-sm text-green-600">{conversation.status}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-900 shadow"
                  }`}
                >
                  {msg.type === "text" ? (
                    <p>{msg.message}</p>
                  ) : msg.type === "image" ? (
                    <img 
                      src={msg.content} 
                      alt="Shared image" 
                      className="rounded-lg max-w-full h-auto"
                    />
                  ) : null}
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-primary-100" : "text-gray-500"}`}>
                    {msg.time}
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
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('photo')}
                  >
                    <Camera className="h-4 w-4" />
                    <span>Photo</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('image')}
                  >
                    <Image className="h-4 w-4" />
                    <span>Galerie</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('video')}
                  >
                    <Video className="h-4 w-4" />
                    <span>Vidéo</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2"
                    onClick={() => handleFileUpload('document')}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Document</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <input
              type="text"
              placeholder="Tapez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            
            <Button 
              variant={isRecording ? "destructive" : "ghost"} 
              size="sm"
              onClick={handleVoiceRecord}
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button className="px-4 py-2" onClick={handleSendMessage}>
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

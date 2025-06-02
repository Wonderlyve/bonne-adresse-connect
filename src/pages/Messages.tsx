
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MoreVertical, Phone, Video, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const navigate = useNavigate();

  const conversations = [
    {
      id: 1,
      name: "Print Express",
      lastMessage: "Votre commande est prête pour le retrait",
      time: "10:30",
      unread: 2,
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Creative Studio",
      lastMessage: "J'ai terminé le logo, que pensez-vous ?",
      time: "09:15",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Archi Plus",
      lastMessage: "Les plans sont disponibles pour validation",
      time: "hier",
      unread: 1,
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const messages = [
    { id: 1, sender: "them", message: "Bonjour ! Merci pour votre commande", time: "10:00" },
    { id: 2, sender: "me", message: "Quand sera-t-elle prête ?", time: "10:05" },
    { id: 3, sender: "them", message: "Votre commande est prête pour le retrait", time: "10:30" }
  ];

  const handleConversationClick = (convId: number) => {
    navigate(`/chat/${convId}`);
  };

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
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleConversationClick(conv.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedChat === conv.id ? "bg-primary-50 border-l-4 border-l-primary-500" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area - Desktop only preview */}
          <div className="lg:col-span-2 hidden lg:flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face"
                    alt="Print Express"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">Print Express</h3>
                    <p className="text-sm text-green-600">En ligne</p>
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
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
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
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-primary-100" : "text-gray-500"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-blue-600">
                  Cliquez sur une conversation pour ouvrir le chat complet
                </p>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  disabled
                />
                <Button className="px-4 py-2" disabled>
                  <Send className="h-4 w-4" />
                </Button>
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


import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageCircle, ShoppingBag, Percent } from "lucide-react";

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Accueil" },
    { path: "/services", icon: Search, label: "Services" },
    { path: "/promotions", icon: Percent, label: "Promos" },
    { path: "/messages", icon: MessageCircle, label: "Messages" },
    { path: "/orders", icon: ShoppingBag, label: "Commandes" }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;

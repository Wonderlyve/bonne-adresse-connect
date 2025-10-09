
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import Promotions from "@/pages/Promotions";
import PrintingServices from "@/pages/PrintingServices";
import DesignServices from "@/pages/DesignServices";
import ArchitectureServices from "@/pages/ArchitectureServices";
import DevelopmentServices from "@/pages/DevelopmentServices";
import Designers from "@/pages/Designers";
import Providers from "@/pages/Providers";
import ProviderProfile from "@/pages/ProviderProfile";
import ContactProvider from "@/pages/ContactProvider";
import OrderService from "@/pages/OrderService";
import AdDetail from "@/pages/AdDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import ProviderDashboard from "@/pages/ProviderDashboard";
import SuperAdminLogin from "@/pages/SuperAdminLogin";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard";
import Orders from "@/pages/Orders";
import Messages from "@/pages/Messages";
import ChatDetail from "@/pages/ChatDetail";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/services/printing" element={<PrintingServices />} />
                <Route path="/services/design" element={<DesignServices />} />
                <Route path="/services/architecture" element={<ArchitectureServices />} />
                <Route path="/services/development" element={<DevelopmentServices />} />
                <Route path="/designers" element={<Designers />} />
                <Route path="/providers" element={<Providers />} />
                <Route path="/provider/:id" element={<ProviderProfile />} />
                <Route path="/contact-provider/:id" element={<ContactProvider />} />
                <Route path="/order/:serviceId" element={<OrderService />} />
                <Route path="/ad/:id" element={<AdDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/super-admin" element={<SuperAdminLogin />} />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                <Route path="/provider-dashboard" element={
                  <ProtectedRoute>
                    <ProviderDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/super-admin-dashboard" element={
                  <ProtectedRoute>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } />
                
                <Route path="/chat/:id" element={
                  <ProtectedRoute>
                    <ChatDetail />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MobileNav />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

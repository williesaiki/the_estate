import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import Index from "./pages/Index";
import About from "./pages/About";
import Offers from "./pages/Offers";
import Favorites from "./pages/Favorites";
import Team from "./pages/Team";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AgentOffers from "./pages/AgentOffers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isLoading } = useLoading();
  
  return (
    <>
      {isLoading && <LoadingScreen isRouteChange={true} />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:id" element={<Offers />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/team" element={<Team />} />
        <Route path="/zespol/:agentSlug" element={<AgentOffers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AppProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </FavoritesProvider>
        </AppProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
};

export default App;

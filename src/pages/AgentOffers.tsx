import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEstiCRMOffers } from '@/hooks/useEstiCRMOffers';
import { mockTeamMembers } from '@/data/mockData';
import AgentOffersGrid from '@/components/AgentOffersGrid';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const AgentOffers = () => {
  const { agentSlug } = useParams<{ agentSlug: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const t = translations[language];

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [agentSlug]);

  // Convert slug back to agent data
  const agent = mockTeamMembers.find(member => {
    const slug = member.name.toLowerCase()
      .replace(/ł/g, 'l')
      .replace(/ą/g, 'a')
      .replace(/ć/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź/g, 'z')
      .replace(/ż/g, 'z')
      .replace(/\s+/g, '-');
    return slug === agentSlug;
  });

  // Use agent email as filter for EstiCRM offers
  const { offers, loading, error } = useEstiCRMOffers();

  // Filter offers by agent email
  const agentOffers = offers.filter(offer => 
    offer.agent_email === agent?.email
  );

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-serif font-light text-foreground mb-6">
            Agent nie został znaleziony
          </h1>
          <Button onClick={() => navigate('/team')} className="btn-luxury">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do zespołu
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Agent Header */}
      <section className="pt-24 pb-12 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/team')}
              className="mr-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do zespołu
            </Button>
          </div>
          
          <div className="bg-[hsl(222.2_84%_4.9%)] rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-32 h-32 rounded-full object-cover shadow-luxury"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
                  {agent.name}
                </h1>
                <div className="space-y-2 text-gray-300 mb-6">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span>📞</span>
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span>✉️</span>
                    <span>{agent.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">
              Oferty agenta
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sprawdź aktualne oferty nieruchomości prowadzone przez {agent.name.split(' ')[0]}
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Ładowanie ofert...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Błąd podczas ładowania ofert: {error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Spróbuj ponownie
              </Button>
            </div>
          )}

          {!loading && !error && agentOffers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {agent.name.split(' ')[0]} obecnie nie ma dostępnych ofert.
              </p>
            </div>
          )}

          {!loading && !error && agentOffers.length > 0 && (
            <AgentOffersGrid offers={agentOffers} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentOffers;
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockTeamMembers } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Team = () => {
  const { language } = useApp();
  const t = translations[language];
  const navigate = useNavigate();

  const generateAgentSlug = (name: string) => {
    return name.toLowerCase()
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
  };

  const founders = [
    {
      id: 'lukasz',
      name: 'Łukasz Paziewski',
      position: 'CEO',
      phone: '512 330 513',
      email: 'paziewski@theestate.pl',
      image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2a1843cfbed224795794b_54-2-p-800.jpg',
      description: 'Współzałożyciel The Estate Warsaw z ponad 10-letnim doświadczeniem w branży nieruchomości premium.'
    },
    {
      id: 'jakub',
      name: 'Jakub Mikołajczuk',
      position: 'Co-CEO',
      phone: '602 113 903',
      email: 'mikolajczuk@theestate.pl',
      image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67ec1a2692b4cb746b0fdb7a_IMG_3828-2-p-800.jpg',
      description: 'Współzałożyciel firmy, specjalista w zakresie inwestycji i rozwoju biznesu w sektorze nieruchomości.'
    }
  ];

  const allTeamMembers = [...founders, ...mockTeamMembers];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6 animate-fade-in">
              {t.team.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
              Poznaj ekspertów, którzy codziennie pracują nad realizacją Twoich marzeń o idealnej nieruchomości.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
              Założyciele
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
            {founders.map((founder, index) => (
              <div 
                key={founder.id} 
                className="card-luxury text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-luxury group-hover:shadow-gold transition-all duration-300"
                  />
                  <div className="absolute inset-0 w-48 h-48 rounded-full mx-auto bg-gradient-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-3xl font-serif font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {founder.name}
                </h3>
                
                <p className="text-primary font-medium text-lg mb-4">
                  {founder.position}
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {founder.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{founder.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{founder.email}</span>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    className="btn-luxury"
                    onClick={() => navigate(`/zespol/${generateAgentSlug(founder.name)}`)}
                  >
                    Zobacz oferty
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
              Nasz Zespół
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mockTeamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="card-luxury text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-card group-hover:shadow-gold transition-all duration-300"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {member.name}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm">{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="btn-ghost-luxury"
                  onClick={() => navigate(`/zespol/${generateAgentSlug(member.name)}`)}
                >
                  Zobacz oferty
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
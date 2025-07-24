import React from 'react';
import { ArrowRight, Home, Users, Package, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockTeamMembers, mockProducts } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { useEstiCRMOffers } from '@/hooks/useEstiCRMOffers';

const HomePreview = () => {
  const { language } = useApp();
  const t = translations[language];
  const { offers, loading, error } = useEstiCRMOffers();

  const previewSections = [
    {
      title: t.about.title,
      icon: Users,
      description: 'Poznaj naszą historię i zespół ekspertów',
      preview: `${t.about.content.substring(0, 120)}...`,
      link: '/about',
      stats: '15+ lat doświadczenia'
    },
    {
      title: t.offers.title,
      icon: Home,
      description: 'Ekskluzywne nieruchomości w najlepszych lokalizacjach',
      preview: loading 
        ? 'Ładowanie aktualnych ofert...' 
        : error 
          ? 'Sprawdź nasze ekskluzywne oferty nieruchomości' 
          : `${offers.length} aktualnych ofert mieszkań i domów premium w Warszawie`,
      link: '/offers',
      stats: loading ? 'Ładowanie...' : error ? 'Oferty dostępne' : `${offers.length} ofert`
    },
    {
      title: t.products.title,
      icon: Package,
      description: 'Produkty lifestyle dla Twojego wnętrza',
      preview: `Zapachy, dekoracje i akcesoria, które podkreślą charakter Twojego domu`,
      link: '/products',
      stats: `${mockProducts.length} produktów`
    },
    {
      title: t.nav.contact,
      icon: Mail,
      description: 'Skontaktuj się z nami',
      preview: 'Profesjonalne doradztwo i pełne wsparcie w procesie zakupu nieruchomości',
      link: '/contact',
      stats: 'Bezpłatne konsultacje'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
            Odkryj The Estate Warsaw
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
            Kompleksowe usługi w zakresie nieruchomości premium i lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {previewSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.title}
                className="card-luxury group hover:shadow-luxury transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {section.description}
                    </p>
                  </div>
                </div>

                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {section.preview}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {section.stats}
                  </span>
                  <Link to={section.link}>
                    <Button variant="ghost" className="group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200">
                      Zobacz więcej
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Team Members Preview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-light text-foreground mb-4">
              Nasz Zespół
            </h3>
            <p className="text-muted-foreground">
              Eksperci, którzy pomogą Ci znaleźć idealną nieruchomość
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {mockTeamMembers.slice(0, 3).map((member, index) => (
              <div 
                key={member.id}
                className="text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover shadow-card group-hover:shadow-gold transition-all duration-300 mb-4"
                />
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {member.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {member.position}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/team">
              <Button variant="outline" className="btn-ghost-luxury">
                Zobacz cały zespół
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePreview;
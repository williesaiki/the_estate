import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockTeamMembers } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import officeHero from '@/assets/office-hero.jpg';

const About = () => {
  const { language } = useApp();
  const t = translations[language];

  const founders = [
    {
      id: 'lukasz',
      name: 'Łukasz Paziewski',
      position: 'CEO',
      phone: '512 330 513',
      email: 'paziewski@theestate.pl',
      image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2a1843cfbed224795794b_54-2-p-800.jpg'
    },
    {
      id: 'jakub',
      name: 'Jakub Mikołajczuk',
      position: 'Co-CEO',
      phone: '602 113 903',
      email: 'mikolajczuk@theestate.pl',
      image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67ec1a2692b4cb746b0fdb7a_IMG_3828-2-p-800.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6 animate-fade-in">
              {t.about.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
              Poznaj historię The Estate Warsaw i ludzi, którzy tworzą wyjątkowe doświadczenia w świecie nieruchomości premium.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
                Nasza Historia
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.content}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Specjalizujemy się w nieruchomościach premium w najlepszych lokalizacjach Warszawy. 
                Nasz zespół łączy pasję do architektury z głęboką znajomością rynku, 
                oferując klientom nie tylko nieruchomości, ale kompletne doświadczenie luksusu.
              </p>
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">250+</div>
                  <div className="text-muted-foreground">Sprzedanych nieruchomości</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-muted-foreground">Lat doświadczenia</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <img 
                src={officeHero}
                alt="Our Office" 
                className="rounded-3xl shadow-luxury w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-luxury opacity-10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-secondary-foreground mb-6 animate-fade-in">
              Założyciele
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {founders.map((founder, index) => (
                <div 
                  key={founder.id} 
                  className="bg-card/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-card/20 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mb-8">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-48 h-48 rounded-full mx-auto object-cover shadow-luxury"
                    />
                    <div className="absolute inset-0 w-48 h-48 rounded-full mx-auto bg-gradient-luxury opacity-20"></div>
                  </div>
                  
                  <h3 className="text-3xl font-serif font-light text-secondary-foreground mb-2">
                    {founder.name}
                  </h3>
                  
                  <p className="text-primary font-medium text-lg mb-6">
                    {founder.position}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3 text-secondary-foreground/80">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>{founder.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-secondary-foreground/80">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>{founder.email}</span>
                    </div>
                  </div>
                  
                  <Button className="btn-luxury mt-6">
                    Zobacz oferty
                  </Button>
                </div>
              ))}
            </div>

            <div className="text-center bg-card/5 backdrop-blur-sm rounded-2xl p-8">
              <p className="text-lg text-secondary-foreground/90 font-light leading-relaxed max-w-4xl mx-auto">
                Stworzyliśmy The Estate dla osób takich jak my - ambitnych, głodnych 
                sukcesu i ciekawych świata. Chcemy się wspólnie rozwijać i tworzyć miejsce, 
                które zmieni rynek pośrednictwa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
              {t.team.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-card group-hover:shadow-gold transition-all duration-300"
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {member.position}
                </p>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
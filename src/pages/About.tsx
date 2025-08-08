
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
                The Estate Warsaw powstało jako odpowiedź na potrzebę zmiany pośrednictwa na rynku nieruchomości na lepsze. Jest to miejsce zrzeszające profesjonalistów w pełnym tego słowa znaczeniu. Jako pierwsi w Polsce wprowadziliśmy rewolucyjny model prowadzenia agencji pośrednictwa nieruchomości, w którym agent zachowuje 100% swojego wynagrodzenia, co znacznie przekłada się na jego skuteczność i zaangażowanie oraz gwarantuje mu większą niezależność.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Jesteśmy gronem agentów z wieloletnim doświadczeniem, których łączy wspólna pasja i chęć nieustannego rozwoju. Specjalizujemy się w sprzedaży i wynajmie nieruchomości na terenie Warszawy, ale również całej Polski. Wspieramy inwestorów oraz sami inwestujemy w nieruchomości.
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
              <video 
                src="https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/651d6fb33d3620e76a6d2d80_FAB5067A-EA11-4329-9A5E-29C13AF2CF85-transcode.mp4"
                autoPlay
                loop
                muted
                playsInline
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

          <div className="max-w-7xl mx-auto">
            {/* Overlapping Images */}
            <div className="flex justify-center mb-16">
              <div className="relative flex items-center">
                <div className="relative">
                  <img 
                    src={founders[0].image} 
                    alt={founders[0].name}
                    className="w-80 h-80 rounded-full object-cover shadow-luxury border-4 border-secondary"
                  />
                  <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-luxury opacity-10"></div>
                </div>
                
                <div className="relative -ml-20 z-10">
                  <img 
                    src={founders[1].image} 
                    alt={founders[1].name}
                    className="w-80 h-80 rounded-full object-cover shadow-luxury border-4 border-secondary"
                  />
                  <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-luxury opacity-10"></div>
                </div>
              </div>
            </div>

            {/* Founders Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              {founders.map((founder, index) => (
                <div key={founder.id} className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-3xl font-serif font-light text-secondary-foreground">
                      {founder.name}
                    </h3>
                    <span className="text-2xl font-light text-secondary-foreground/50">&</span>
                  </div>
                  <p className="text-xl font-medium text-secondary-foreground/70">
                    {founder.position}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3 text-secondary-foreground/80">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-lg">{founder.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-secondary-foreground/80">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-lg">{founder.email}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="btn-ghost-luxury mt-6">
                    Zobacz oferty
                  </Button>
                </div>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-xl text-secondary-foreground/90 font-light leading-relaxed">
                Stworzyliśmy The Estate dla osób takich jak my - ambitnych, głodnych 
                sukcesu i ciekawych świata. Chcemy się wspólnie rozwijać i tworzyć miejsce, 
                które zmieni rynek pośrednictwa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Forbes Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
                  The Estate Warsaw w Forbes!
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Na łamach majowego wydania prestiżowego magazynu Forbes pojawił się wywiad 
                  z założycielami naszej agencji. Łukasz Paziewski i Jakub Mikołajczuk opowiadali 
                  o tym jaka jest geneza naszego brandu. Podkreślali dlaczego wyróżniamy się na 
                  rynku i jakie innowacyjne rozwiązania zastosowaliśmy przy budowie naszej marki.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dzięki nim tworzymy jedną z najbardziej postępowych agencji. Z wywiadu dowiecie 
                  się, dlaczego warto zaufać The Estate Warsaw i jak chcemy się dalej rozwijać!
                </p>
              </div>
              
              <div className="relative animate-slide-in-right">
                <img 
                  src="https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/66aa3d7f965297e53acde8df_Capture-2024-07-31-153438.png"
                  alt="The Estate Warsaw w Forbes" 
                  className="rounded-3xl shadow-luxury w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-luxury opacity-10 rounded-3xl"></div>
              </div>
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

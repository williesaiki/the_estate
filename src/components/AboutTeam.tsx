import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { mockTeamMembers } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import officeHero from '@/assets/office-hero.jpg';

const AboutTeam = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.content}
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

        {/* Team Section */}
        <div id="team" className="text-center mb-16">
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
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{member.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
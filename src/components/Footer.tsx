import React, { useState } from 'react';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Footer = () => {
  const { language } = useApp();
  const t = translations[language];
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-6">
            <img 
              src="https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/64f34c2162f4f8d189da8e68_Group.svg" 
              alt="Logo" 
              className="h-8 w-auto filter brightness-100"
            />
            <p className="text-secondary-foreground/80 leading-relaxed">
              {t.about.content}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-secondary-foreground">Nawigacja</h3>
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {t.nav.about}
              </button>
              <button 
                onClick={() => scrollToSection('offers')}
                className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {t.nav.offers}
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {t.nav.team}
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {t.nav.products}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-secondary-foreground">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-secondary-foreground/80">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary-foreground/80">
                <Phone className="h-5 w-5 text-primary" />
                <span>{t.footer.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary-foreground/80">
                <Mail className="h-5 w-5 text-primary" />
                <span>{t.footer.email}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-secondary-foreground">Newsletter</h3>
            <p className="text-secondary-foreground/80 text-sm">
              {t.footer.newsletter}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Twój email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-border/20 text-secondary-foreground placeholder:text-secondary-foreground/60"
              />
              <Button type="submit" className="btn-luxury w-full">
                {t.footer.subscribe}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-secondary-foreground/60 text-sm">
            © 2024 The Estate Warsaw. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex space-x-6 text-sm">
            <button className="text-secondary-foreground/60 hover:text-primary transition-colors duration-200">
              Polityka prywatności
            </button>
            <button className="text-secondary-foreground/60 hover:text-primary transition-colors duration-200">
              Regulamin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroScrolled, setIsHeroScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Hero is h-screen (100vh)
      const heroScrolled50 = scrollY > (heroHeight * 0.5); // 50% of hero height
      
      setIsScrolled(scrollY > 30);
      setIsHeroScrolled(heroScrolled50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine text colors based on theme and scroll position
  const getTextClasses = () => {
    // Special logic only for landing page (home page)
    if (location.pathname === '/') {
      if (theme === 'dark') {
        return isScrolled 
          ? 'text-foreground/80 hover:text-primary' 
          : 'text-white/90 hover:text-white';
      } else {
        // Light theme on landing: white text in hero, dark text after scroll
        return isScrolled 
          ? 'text-foreground/80 hover:text-primary' 
          : 'text-white/90 hover:text-white';
      }
    } else {
      // For all other pages: normal text colors
      return 'text-foreground/80 hover:text-primary';
    }
  };

  const getLogoClasses = () => {
    if (location.pathname === '/') {
      return isHeroScrolled 
        ? 'filter brightness-0 dark:brightness-100' 
        : 'filter brightness-100';
    } else {
      return 'filter brightness-0 dark:brightness-100';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'navbar-blur shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/64f34c2162f4f8d189da8e68_Group.svg" 
              alt="Logo" 
              className={`h-8 w-auto transition-all duration-300 ${getLogoClasses()}`}
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about"
              className={`transition-colors duration-200 font-medium ${getTextClasses()}`}
            >
              {t.nav.about}
            </Link>
            <Link 
              to="/offers"
              className={`transition-colors duration-200 font-medium ${getTextClasses()}`}
            >
              {t.nav.offers}
            </Link>
            <Link 
              to="/team"
              className={`transition-colors duration-200 font-medium ${getTextClasses()}`}
            >
              {t.nav.team}
            </Link>
            <Link 
              to="/products"
              className={`transition-colors duration-200 font-medium ${getTextClasses()}`}
            >
              {t.nav.products}
            </Link>
            <Link 
              to="/contact"
              className={`transition-colors duration-200 font-medium ${getTextClasses()}`}
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle
              language={language}
              onToggle={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
              className="transition-opacity duration-200"
            />

            {/* Theme Toggle */}
            <ThemeToggle
              isDark={theme === 'dark'}
              onToggle={toggleTheme}
              className="transition-opacity duration-200"
            />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle
              language={language}
              onToggle={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
              className="transition-opacity duration-200"
            />
            
            <ThemeToggle
              isDark={theme === 'dark'}
              onToggle={toggleTheme}
              className="transition-opacity duration-200"
            />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className={`p-2 ${getTextClasses()}`}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full bg-background">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <img 
                      src="https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/64f34c2162f4f8d189da8e68_Group.svg" 
                      alt="Logo" 
                      className="h-8 w-auto filter brightness-0 dark:brightness-100"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2 px-6">
                      <Link 
                        to="/about"
                        className="block py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t.nav.about}
                      </Link>
                      <Link 
                        to="/offers"
                        className="block py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t.nav.offers}
                      </Link>
                      <Link 
                        to="/team"
                        className="block py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t.nav.team}
                      </Link>
                      <Link 
                        to="/products"
                        className="block py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t.nav.products}
                      </Link>
                      <Link 
                        to="/contact"
                        className="block py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t.nav.contact}
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
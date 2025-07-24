import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Navbar = () => {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroScrolled, setIsHeroScrolled] = useState(false);
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
    if (theme === 'dark') {
      // Dark theme: always light text when not scrolled past hero
      return isHeroScrolled 
        ? 'text-foreground/80 hover:text-primary' 
        : 'text-white/90 hover:text-white';
    } else {
      // Light theme: dark text always, except in hero section (when not scrolled 50%)
      return isHeroScrolled 
        ? 'text-foreground/80 hover:text-primary' 
        : 'text-white/90 hover:text-white';
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
              className={`h-8 w-auto transition-all duration-300 ${
                isHeroScrolled 
                  ? 'filter brightness-0 dark:brightness-100' 
                  : 'filter brightness-100'
              }`}
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

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
              className={`flex items-center space-x-1 transition-colors duration-200 ${getTextClasses()}`}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`transition-colors duration-200 ${getTextClasses()}`}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
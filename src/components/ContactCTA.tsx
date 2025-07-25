import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/6784efd301afec174bd980cc_04cf1f58daef6d65989d4baced6a0a0a.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Gradient Overlay at top - longer to cover opinions */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent z-5" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-40">
        <div className="max-w-2xl mx-auto">
          <div className="border border-white/20 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Main Message */}
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Jesteś zainteresowany współpracą?
                </h2>
                <p className="text-xl md:text-2xl font-light mb-6">
                  Skontaktuj się z nami!
                </p>
              </div>
              
              {/* Right Side - Contact Info */}
              <div className="text-white space-y-4">
                <div>
                  <p className="text-lg font-medium">+ 48 512 330 513</p>
                </div>
                
                <div>
                  <p className="text-lg">office@theestate.pl</p>
                </div>
                
                <div>
                  <p className="text-base">Mokotowska 3/12</p>
                </div>
                
                <div className="pt-4">
                  <p className="text-base mb-1">Odwiedź nas na Instagramie!</p>
                  <p className="text-base font-medium">@theestatewarsaw</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-white/20">
              <a href="https://www.facebook.com/theestatewarsaw/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/theestatewarsaw/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/company/theestatewarsaw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
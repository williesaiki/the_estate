import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/6784efd301afec174bd980cc_04cf1f58daef6d65989d4baced6a0a0a.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="border border-white/20 p-12 md:p-16">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Side - Main Message */}
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Jesteś zainteresowany współpracą?
                </h2>
                <p className="text-2xl md:text-3xl font-light mb-8">
                  Skontaktuj się z nami!
                </p>
              </div>
              
              {/* Right Side - Contact Info */}
              <div className="text-white space-y-6">
                <div>
                  <p className="text-xl font-medium">+ 48 512 330 513</p>
                </div>
                
                <div>
                  <p className="text-xl">office@theestate.pl</p>
                </div>
                
                <div>
                  <p className="text-lg">Mokotowska 3/12</p>
                </div>
                
                <div className="pt-6">
                  <p className="text-lg mb-2">Odwiedź nas na Instagramie!</p>
                  <p className="text-lg font-medium">@theestatewarsaw</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-6 mt-12 pt-8 border-t border-white/20">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
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
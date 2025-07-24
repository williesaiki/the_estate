import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProducts } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Products = () => {
  const { language } = useApp();
  const t = translations[language];
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const categories = ['Wszystkie', 'Zapachy', 'Dekoracje', 'Świece', 'Plakaty'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6 animate-fade-in">
              {t.products.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
              Ekskluzywne produkty lifestyle, które podkreślą charakter Twojego wnętrza.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="px-6 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {mockProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="card-luxury group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  
                  {/* Quick Add Button */}
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 text-foreground hover:bg-white"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  
                  {/* Badge */}
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Premium
                  </Badge>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(12)</span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {product.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price} zł
                  </span>
                  <Button 
                    className="btn-luxury"
                    onClick={() => addToCart(product.id)}
                  >
                    Dodaj do koszyka
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Product */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="card-luxury bg-gradient-subtle">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-primary text-primary-foreground">
                    Produkt miesiąca
                  </Badge>
                  <h3 className="text-3xl font-serif font-light text-foreground mb-4">
                    Ekskluzywny Zestaw Aromatyczny
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Wyjątkowy zestaw zapachów do domu, stworzony specjalnie dla klientów The Estate Warsaw. 
                    Kompozycja nut drzewnych i kwiatowych idealnie oddaje charakter luksusowych wnętrz.
                  </p>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-primary">399 zł</span>
                    <span className="text-lg text-muted-foreground line-through">499 zł</span>
                    <Badge variant="destructive">-20%</Badge>
                  </div>
                  <Button className="btn-luxury">
                    Zamów teraz
                  </Button>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=500&fit=crop"
                    alt="Featured Product"
                    className="w-full h-80 object-cover rounded-2xl shadow-luxury"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
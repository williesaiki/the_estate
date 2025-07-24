import React from 'react';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Products = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section id="products" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
            {t.products.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  className="w-full h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {product.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-sm">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {product.price} zł
                </span>
                <Button variant="outline" className="btn-ghost-luxury">
                  {t.products.viewProduct}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
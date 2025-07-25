import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OffersSlider from '@/components/OffersSlider';
import HomePreview from '@/components/HomePreview';
import Testimonials from '@/components/Testimonials';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import { useEstiCRMOffers } from '@/hooks/useEstiCRMOffers';

const Index = () => {
  // Preload offers data in the background
  useEstiCRMOffers();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <OffersSlider />
      <HomePreview />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;

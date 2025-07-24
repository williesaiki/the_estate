import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OffersSlider from '@/components/OffersSlider';
import PropertiesGrid from '@/components/PropertiesGrid';
import AboutTeam from '@/components/AboutTeam';
import Testimonials from '@/components/Testimonials';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <OffersSlider />
      <PropertiesGrid />
      <AboutTeam />
      <Testimonials />
      <Products />
      <Footer />
    </div>
  );
};

export default Index;

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OffersSlider from '@/components/OffersSlider';
import HomePreview from '@/components/HomePreview';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <OffersSlider />
      <HomePreview />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;

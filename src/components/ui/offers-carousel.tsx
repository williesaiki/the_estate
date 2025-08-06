"use client";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useId, useEffect } from "react";
import { EstiCRMOffer } from "@/hooks/useEstiCRMOffers";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Square } from "lucide-react";

interface SlideProps {
  offer: EstiCRMOffer;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  onViewOffer: (offer: EstiCRMOffer) => void;
  t: any;
}

const Slide = ({ offer, index, current, handleSlideClick, onViewOffer, t }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-card rounded-[1%] overflow-hidden transition-all duration-150 ease-out shadow-luxury"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.7,
            }}
            alt={offer.title}
            src={offer.image}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {current === index && (
            <div className="absolute inset-0 bg-black/20 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h3 className="text-lg md:text-2xl lg:text-3xl font-serif font-light mb-4 relative text-white">
            {offer.title}
          </h3>
          
          <div className="flex items-center justify-center space-x-2 mb-4 text-white/80">
            <MapPin className="h-4 w-4" />
            <span className="text-sm md:text-base">{offer.location}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-4 text-xs md:text-sm text-white/70">
            <div className="flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>{offer.rooms} {t.offers.rooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span>{offer.area} m²</span>
            </div>
          </div>
          
          <div className="text-xl md:text-2xl font-bold text-white mb-6">
            {offer.price.toLocaleString()} zł
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onViewOffer(offer);
              }}
              className="mt-2 px-6 py-2 w-fit mx-auto text-sm bg-white text-black h-10 border border-transparent flex justify-center items-center rounded-full hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              {t.offers.viewOffer}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-12 h-12 flex items-center mx-3 justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:border-primary focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 text-white hover:bg-white/20 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <ArrowRight className="h-5 w-5" />
    </button>
  );
};

interface OffersCarouselProps {
  offers: EstiCRMOffer[];
  onViewOffer: (offer: EstiCRMOffer) => void;
  t: any;
}

export default function OffersCarousel({ offers, onViewOffer, t }: OffersCarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? offers.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === offers.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  // Auto-advance slides
  useEffect(() => {
    if (offers.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / offers.length)}%)`,
        }}
      >
        {offers.map((offer, index) => (
          <Slide
            key={offer.id}
            offer={offer}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            onViewOffer={onViewOffer}
            t={t}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title={t.offers.previous || "Go to previous slide"}
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title={t.offers.next || "Go to next slide"}
          handleClick={handleNextClick}
        />
      </div>
      
      {/* Dots Indicator */}
      <div className="absolute flex justify-center w-full top-[calc(100%+4rem)]">
        <div className="flex space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
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
        onClick={() => onViewOffer(offer)}
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
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h3 className="text-lg md:text-xl font-serif font-light mb-2 text-white">
            {offer.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-2 text-white/80">
            <MapPin className="h-3 w-3" />
            <span className="text-xs md:text-sm">{offer.location}</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-2 text-xs text-white/70">
            <div className="flex items-center space-x-1">
              <Home className="h-3 w-3" />
              <span>{offer.rooms} {t.offers.rooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="h-3 w-3" />
              <span>{offer.area} m²</span>
            </div>
          </div>
          
          <div className="text-lg md:text-xl font-bold text-white">
            {offer.price.toLocaleString()} zł
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
      className={`absolute top-1/2 -translate-y-1/2 ${
        type === "previous" ? "-left-16" : "-right-16"
      } w-12 h-12 flex items-center justify-center bg-white dark:bg-black/80 border border-border rounded-full focus:border-primary focus:outline-none hover:scale-105 active:scale-95 transition-all duration-200 text-foreground shadow-lg z-20 ${
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
  );
}
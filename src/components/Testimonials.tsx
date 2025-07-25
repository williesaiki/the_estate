import React from 'react';
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const testimonials = [
  {
    text: "Ta platforma zrewolucjonizowała nasze operacje, usprawniając finanse i zarządzanie nieruchomościami. Dzięki niej jesteśmy produktywni nawet zdalnie.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Anna Kowalska",
    role: "Kierownik Operacyjny",
  },
  {
    text: "Wdrożenie systemu było szybkie i płynne. Przyjazny interfejs sprawił, że szkolenie zespołu przebiegło bez problemów.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Marcin Nowak",
    role: "Kierownik IT",
  },
  {
    text: "Zespół wsparcia jest wyjątkowy, pomagają przez cały proces i zapewniają ciągłą pomoc, gwarantując nasze zadowolenie.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Katarzyna Wiśniewska",
    role: "Kierownik Wsparcia Klienta",
  },
  {
    text: "Bezproblemowa integracja systemu poprawiła nasze operacje biznesowe i efektywność. Zdecydowanie polecam za intuicyjny interfejs.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Tomasz Lewandowski",
    role: "Prezes",
  },
  {
    text: "Zaawansowane funkcje i szybkie wsparcie przekształciły nasz sposób pracy, czyniąc nas znacznie bardziej efektywnymi.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Agnieszka Kamińska",
    role: "Kierownik Projektów",
  },
  {
    text: "Płynne wdrożenie przeszło nasze oczekiwania. Usprawniło procesy, poprawiając ogólną wydajność biznesową.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Monika Szymańska",
    role: "Analityk Biznesowy",
  },
  {
    text: "Nasze funkcje biznesowe poprawiły się dzięki przyjaznemu projektowi i pozytywnym opiniom klientów.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Paweł Zieliński",
    role: "Dyrektor Marketingu",
  },
  {
    text: "Dostarczyli rozwiązanie, które przekroczyło oczekiwania, rozumiejąc nasze potrzeby i usprawniając operacje.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Magdalena Wójcik",
    role: "Kierownik Sprzedaży",
  },
  {
    text: "Korzystając z tego systemu, nasza obecność online i konwersje znacznie się poprawiły, zwiększając wydajność biznesową.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Łukasz Dąbrowski",
    role: "Kierownik E-commerce",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Opinie</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            {t.testimonials.title}
          </h2>
          <p className="text-center mt-5 opacity-75">
            Zobacz co mówią o nas nasi klienci.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
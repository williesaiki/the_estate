import React from 'react';
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const testimonials = [
  {
    text: "Sprzedałam mieszkanie z pomocą pośrednika – pana Marcina Skoczka – i jestem bardzo zadowolona ze współpracy. Pan Marcin przejął na siebie wszystkie formalności i prowadził je profesjonalnie.",
    name: "Alena Vanli",
  },
  {
    text: "Serdeczne podziękowania dla Pana Bartosza Barana. Zrobiliśmy wspólnie kilka wymagających tematów mieszkaniowych. Jeśli poszukują Państwo kogoś kto nie boi się wyzwań - polecam!",
    name: "Daisy Boo",
  },
  {
    text: "Miałam przyjemność współpracować z Panem Oliwierem Aleksandrem przy sprzedaży mieszkania i z pełnym przekonaniem mogę polecić jego usługi. Proces sprzedaży przebiegł sprawnie.",
    name: "Malgorzata Korczak",
  },
  {
    text: "Pragnę serdecznie podziękować Pani Milenie Bonisławskiej za profesjonalizm, zaangażowanie i wsparcie podczas procesu sprzedaży mojej nieruchomości. Wiedza Pani Mileny jest imponująca.",
    name: "Agnieszka Mank",
  },
  {
    text: "Bardzo polecam! Pan Paweł Tamowski z The Estate wykazał się prawdziwym profesjonalizmem podczas naszej współpracy. Przejawiał inicjatywę i zaangażowanie.",
    name: "Karol Abramczyk",
  },
  {
    text: "Jestem zadowolona ze współpracy z Panem Adamem. Profesjonalne podejście i duża wiedza o rynku nieruchomości bardzo pomogły w sprawnym przeprowadzeniu sprzedaży.",
    name: "Justyna Wróbel",
  },
  {
    text: "Jestem bardzo wdzięczny za współpracę z Panem Olivierem Aleksander, który przeprowadził mnie przez cały proces zakupu nieruchomości od A do Z. Pomógł mi znaleźć wymarzone mieszkanie.",
    name: "Kacper Miriuk",
  },
  {
    text: "Profesjonalne i skuteczne biuro nieruchomości. Szczególnie polecam Panią Milenę Bonisławską - przeprowadziła transakcję bardzo sprawnie, była kontaktowa i pomogła we wszystkich sprawach okołozakupowych.",
    name: "Dzień dobry",
  },
  {
    text: "Serdecznie polecam współpracę z panią Arianą Zgórzak! Od pierwszego kontaktu wyróżniała się profesjonalizmem i świetną komunikacją. Dzięki jej wsparciu cały proces przebiegł bezproblemowo.",
    name: "Klaudia Cieślak",
  },
  {
    text: "Pełen profesjonalizm i zaangażowanie. Szczególne podziękowania dla Pana Oliwiera za kompleksowe przeprowadzenie sprzedaży mieszkania od A do Z. Współpraca i obsługa klienta na bardzo wysokim poziomie.",
    name: "Ewa Gromadzka",
  },
  {
    text: "Serdecznie polecam współpracę z Panem Pawłem Tamowskim. Sprzedaż na odległość poprowadzona wzorowo. Super kontakt i pełen profesjonalizm w poprowadzeniu całej procedury sprzedażowej.",
    name: "Michal Kieres",
  },
  {
    text: "Bardzo polecam The Estate Warsaw. Transakcja przeprowadzona sprawnie i profesjonalnie. Pan Bartosz w pełni profesjonalnie przeprowadził transakcje. 100% polecam.",
    name: "Mateusz Piwowar",
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
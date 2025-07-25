import { Property, TeamMember, Testimonial, Product } from '@/types';
import property1 from '@/assets/property1.jpg';
import property2 from '@/assets/property2.jpg';
import property3 from '@/assets/property3.jpg';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Nowoczesny Apartament z Widokiem',
    location: 'Mokotów, Warszawa',
    price: 1250000,
    rooms: 3,
    area: 75,
    floor: 8,
    description: 'Przestronny apartament z dużym balkonem, świetnie doświetlony, idealny dla rodziny...',
    image: property1,
    amenities: ['Balkon', 'Winda', 'Garaż', 'Klimatyzacja', 'Ochrona'],
    type: 'sale'
  },
  {
    id: '2',
    title: 'Luksusowy Penthouse',
    location: 'Śródmieście, Warszawa',
    price: 2850000,
    rooms: 4,
    area: 120,
    floor: 15,
    description: 'Ekskluzywny penthouse z tarasem i panoramicznym widokiem na miasto...',
    image: property2,
    amenities: ['Taras', 'Jacuzzi', 'Winda', 'Garaż', 'Concierge'],
    type: 'sale'
  },
  {
    id: '3',
    title: 'Rodzinny Dom w Zieleni',
    location: 'Wilanów, Warszawa',
    price: 1950000,
    rooms: 5,
    area: 180,
    description: 'Przestronny dom z ogrodem, idealny dla dużej rodziny, w spokojnej okolicy...',
    image: property3,
    amenities: ['Ogród', 'Garaż', 'Kominek', 'Sauna', 'Basen'],
    type: 'sale'
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Łukasz Paziewski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2a1843cfbed224795794b_54-2.jpg',
    description: 'Doświadczony specjalista w branży nieruchomości.',
    phone: '512 330 513',
    email: 'paziewski@theestate.pl'
  },
  {
    id: '2',
    name: 'Jakub Mikołajczuk',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67ec1a2692b4cb746b0fdb7a_IMG_3828-2.jpg',
    description: 'Ekspert w zakresie nieruchomości mieszkaniowych.',
    phone: '602 113 903',
    email: 'mikolajczuk@theestate.pl'
  },
  {
    id: '3',
    name: 'Adam Staszkiewicz',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d5484f74041e32bf395_9ciTjWUFTyEtEkxJPoztb4en6-M2zcTHvNxdDd5eelw.webp',
    description: 'Specjalista w zakresie nieruchomości komercyjnych.',
    phone: '791 094 165',
    email: 'staszkiewicz@theestate.pl'
  },
  {
    id: '4',
    name: 'Adrian Paczkowski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65ae8edd8b917e453253b517_IMG-4704-p-2600.jpg',
    description: 'Doradca w zakresie inwestycji nieruchomościowych.',
    phone: '721 079 628',
    email: 'paczkowski@theestate.pl'
  },
  {
    id: '5',
    name: 'Adrian Perzanowski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d4ea58e4c719304ff28_rDg22_7X6UDPc2gKouJ7CvX8naXolQCP8Md4ZcCHS9A.webp',
    description: 'Ekspert w zakresie nieruchomości luksusowych.',
    phone: '509 291 030',
    email: 'perzanowski@theestate.pl'
  },
  {
    id: '6',
    name: 'Aleksandra Zielińska',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d6c73242f0e86d85c0b_x1As6U6gxcRo6Hw-prhu754U0S-s8zUiXFzR3_Xz8P8.webp',
    description: 'Specjalistka w zakresie mieszkań dla młodych rodzin.',
    phone: '666 649 303',
    email: 'zielinska@theestate.pl'
  },
  {
    id: '7',
    name: 'Aneta Janaszek',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d4e41e1130afef66fd4_FR4scPn8HQx9pkdC4lw27EMV2yy850N1k0Z3a8uVXJA.webp',
    description: 'Doradczyni w zakresie sprzedaży mieszkań.',
    phone: '696 020 137',
    email: 'janaszek@theestate.pl'
  },
  {
    id: '8',
    name: 'Ariana Zgórzak',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2d9cd1947eb45fa33fab6_58-p-1600.jpg',
    description: 'Ekspertka w zakresie wynajmu nieruchomości.',
    phone: '511 720 207',
    email: 'zgorzak@theestate.pl'
  },
  {
    id: '9',
    name: 'Artur Wyrzykowski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/685178d7fa79485d81dfbb0d_8H9A9967%202%202.jpg',
    description: 'Specjalista w zakresie nieruchomości mieszkaniowych.',
    phone: '530 270 080',
    email: 'wyrzykowski@theestate.pl'
  },
  {
    id: '10',
    name: 'Bartosz Baran',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/663c5718690cedb00ca76fd5_18-p-1600.jpg',
    description: 'Doradca w zakresie inwestycji mieszkaniowych.',
    phone: '600 239 673',
    email: 'baran@theestate.pl'
  },
  {
    id: '11',
    name: 'Bartosz Popardowski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d4e2ffce207a019dfdc_X-ng-PvtnAJDxLXnZ5b2jMQhUCemHxrcNVPM-vK95iU.webp',
    description: 'Ekspert w zakresie nieruchomości komercyjnych.',
    phone: '514 900 776',
    email: 'popardowski@theestate.pl'
  },
  {
    id: '12',
    name: 'Bilguun Munkhtsetseg',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d5deb8ff99c19590a7c_1X9Lx40IH2N4xQcxcT6Rh93uw5FbgA487Yx2HZl1Zog-p-1600.jpeg',
    description: 'Specjalista w zakresie obsługi klientów międzynarodowych.',
    phone: '508 207 334',
    email: 'm.bilguun@theestate.pl'
  },
  {
    id: '13',
    name: 'Dawid Dybski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d661acc9153af05efaf_LHYrIYh_vPq_2r_OyWYfi2hX535KFizIMsXCAYmRdvQ.webp',
    description: 'Doradca w zakresie nieruchomości mieszkaniowych.',
    phone: '503 805 634',
    email: 'dybski@theestate.pl'
  },
  {
    id: '14',
    name: 'Dominika Rosłon',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d5d2b22d32d5be37e8f_Wk-k0t0KFx3FyiIdJhjDdILNyw6uRC3R2Ea9FzO8VMc.webp',
    description: 'Specjalistka w zakresie mieszkań na wynajem.',
    phone: '690 141 481',
    email: 'roslon@theestate.pl'
  },
  {
    id: '15',
    name: 'Gerard Młochowski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/681eebe299ae8f236be7863c_Projekt%20bez%20nazwy-p-1600.png',
    description: 'Ekspert w zakresie nieruchomości luksusowych.',
    phone: '781 459 294',
    email: 'mlochowski@theestate.pl'
  },
  {
    id: '16',
    name: 'Grzegorz Zapora',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/6706704296b7d7582fc86e82_14-p-1600.jpeg',
    description: 'Doradca w zakresie inwestycji nieruchomościowych.',
    phone: '513 734 793',
    email: 'zapora@theestate.pl'
  },
  {
    id: '17',
    name: 'Jan Mikołajczuk',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d6673242f0e86d85687_9bOUK9iV4Ou3NZmRhkivu0bf10n3WqQILf0H9VagMPo.webp',
    description: 'Specjalista w zakresie nieruchomości mieszkaniowych.',
    phone: '600 813 132',
    email: 'jmikolajczuk@theestate.pl'
  },
  {
    id: '18',
    name: 'Joanna Waryszak',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/682b022a9840d1ceff669159_413810270_858295272968604_5563674238832545715_n.jpeg',
    description: 'Ekspertka w zakresie obsługi klienta.',
    phone: '514 203 651',
    email: 'waryszak@theestate.pl'
  },
  {
    id: '19',
    name: 'Maciej Kurowski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2a12e457774b4b2f82d7b_14-p-1600.jpg',
    description: 'Doradca w zakresie sprzedaży mieszkań.',
    phone: '791 264 567',
    email: 'kurowski@theestate.pl'
  },
  {
    id: '20',
    name: 'Maksymilian Radliński',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/68242e0f98365a789f95a6a1_1-p-1600.jpg',
    description: 'Specjalista w zakresie nieruchomości komercyjnych.',
    phone: '691 371 191',
    email: 'radlinski@theestate.pl'
  },
  {
    id: '21',
    name: 'Marcin Jarzyna',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e6c/64f34c2162f4f8d189da8e66_avatar.svg',
    description: 'Ekspert w zakresie wynajmu nieruchomości.',
    phone: '886 395 806',
    email: 'jarzyna@theestate.pl'
  },
  {
    id: '22',
    name: 'Marcin Skoczek',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65a4efa0a1e4c06fc30a5597_17-p-1600.jpg',
    description: 'Doradca w zakresie inwestycji mieszkaniowych.',
    phone: '509 335 401',
    email: 'skoczek@theestate.pl'
  },
  {
    id: '23',
    name: 'Marcin Skrzecz',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65660dddacf4b15518fa1d59_1-p-1600.jpg',
    description: 'Specjalista w zakresie nieruchomości luksusowych.',
    phone: '514 575 861',
    email: 'skrzecz@theestate.pl'
  },
  {
    id: '24',
    name: 'Marcin Szulik',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/6661f6b7540544d867557525_9%202-p-1600.jpg',
    description: 'Ekspert w zakresie obsługi klientów.',
    phone: '512 397 628',
    email: 'szulik@theestate.pl'
  },
  {
    id: '25',
    name: 'Mateusz Panoczko',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d6cd31ee365bcb4d425_pVmUfQZuK5QIFzUFfYwbqNdaO2nRuhh5Taym_rdEzxU-p-1600.jpeg',
    description: 'Doradca w zakresie nieruchomości mieszkaniowych.',
    phone: '721 898 429',
    email: 'panoczko@theestate.pl'
  },
  {
    id: '26',
    name: 'Michał Powała',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2a1dbbe934bc5e6b724c8_16-p-1600.jpg',
    description: 'Specjalista w zakresie nieruchomości premium.',
    phone: '881 353 685',
    email: 'powala@povalagroup.pl'
  },
  {
    id: '27',
    name: 'Olivier Aleksander',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d44a58e4c719304f7bb_F57n305lbxq9PtsNIUAlsyr0NP03LIHkpvs9ICoLliw.jpeg',
    description: 'Ekspert w zakresie obsługi klientów międzynarodowych.',
    phone: '661 900 080',
    email: 'aleksander@theestate.pl'
  },
  {
    id: '28',
    name: 'Oskar Popławski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/663c570d846ca6d39dde3ece_4-p-1600.jpg',
    description: 'Doradca w zakresie wynajmu mieszkań.',
    phone: '577 102 920',
    email: 'poplawski@theestate.pl'
  },
  {
    id: '29',
    name: 'Patrycja Bąk',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/65398d61d31ee365bcb4cb87_lgKxR1uAlLFMy163cNXVsQGAl6XQtR_7Fzg9v-WGxrU.webp',
    description: 'Specjalistka w zakresie mieszkań dla młodych rodzin.',
    phone: '692 035 349',
    email: 'bak@theestate.pl'
  },
  {
    id: '30',
    name: 'Paulina Florys',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2a1bc6be0d54480128fd3_unnamed-p-1600.jpg',
    description: 'Ekspertka w zakresie sprzedaży nieruchomości.',
    phone: '663 997 207',
    email: 'florys@theestate.pl'
  },
  {
    id: '31',
    name: 'Paweł Tamowski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/663c58052121abf336c59f75_24%202-p-1600.jpg',
    description: 'Doradca w zakresie inwestycji nieruchomościowych.',
    phone: '734 462 737',
    email: 'tamowski@theestate.pl'
  },
  {
    id: '32',
    name: 'Szymon Haase',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/663c56da62bc180298f89215_1-p-1600.jpg',
    description: 'Specjalista w zakresie obsługi klienta.',
    phone: '503 075 007',
    email: 'haase@theestate.pl'
  },
  {
    id: '33',
    name: 'Szymon Kudyba',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/67e2a192e4aed3efcb9b6149_18-p-1600.jpg',
    description: 'Ekspert w zakresie nieruchomości mieszkaniowych.',
    phone: '725 302 098',
    email: 'kudyba@theestate.pl'
  },
  {
    id: '34',
    name: 'Tomasz Paziewski',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/663c5799376eb0519ef38b92_12-p-1600.jpg',
    description: 'Doradca w zakresie sprzedaży mieszkań.',
    phone: '501 203 131',
    email: 'tpaziewski@theestate.pl'
  },
  {
    id: '35',
    name: 'Wiktoria Bugnacka',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/68242e4134820f8c5e5edcea_Projekt%20bez%20nazwy-p-1600.png',
    description: 'Specjalistka w zakresie wynajmu nieruchomości.',
    phone: '531 079 649',
    email: 'bugnacka@theestate.pl'
  },
  {
    id: '36',
    name: 'Zuzanna Marko',
    position: 'Agent Nieruchomości',
    image: 'https://cdn.prod.website-files.com/64f34c2162f4f8d189da8e30/681c9f02211037505aaa2e57_image00001.jpeg',
    description: 'Ekspertka w zakresie obsługi klientów.',
    phone: '571 354 512',
    email: 'marko@theestate.pl'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Tomasz Zieliński',
    text: 'Profesjonalna obsługa i doskonała znajomość rynku. Dzięki zespołowi znaleźliśmy idealne mieszkanie.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Maria Kwiatkowska',
    text: 'Świetne doradztwo i pełne wsparcie przez cały proces zakupu. Gorąco polecam!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Paweł Dąbrowski',
    text: 'Bardzo profesjonalne podejście. Proces sprzedaży przebiegł sprawnie i bezproblemowo.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Luksusowy Zapach Domowy',
    price: 189,
    image: 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?w=400&h=400&fit=crop',
    description: 'Ekskluzywny zapach do wnętrz premium'
  },
  {
    id: '2',
    title: 'Artystyczny Plakat',
    price: 249,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    description: 'Nowoczesny plakat architektoniczny'
  },
  {
    id: '3',
    title: 'Designerska Świeca',
    price: 129,
    image: 'https://images.unsplash.com/photo-1602874801007-83b1f51c1de9?w=400&h=400&fit=crop',
    description: 'Ręcznie wykonana świeca sojowa'
  }
];
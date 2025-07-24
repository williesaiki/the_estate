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
    name: 'Anna Kowalska',
    position: 'Dyrektor Sprzedaży',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    description: 'Doświadczony specjalista z 10-letnim stażem w branży nieruchomości.'
  },
  {
    id: '2',
    name: 'Michał Nowak',
    position: 'Senior Broker',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    description: 'Ekspert w zakresie nieruchomości luksusowych i inwestycyjnych.'
  },
  {
    id: '3',
    name: 'Katarzyna Wiśniewska',
    position: 'Konsultant',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    description: 'Specjalistka w zakresie mieszkań dla młodych rodzin.'
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
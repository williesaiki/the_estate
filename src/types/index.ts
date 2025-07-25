export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rooms: number;
  area: number;
  floor?: number;
  description: string;
  image: string;
  amenities: string[];
  type: 'sale' | 'rent';
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  description: string;
  phone?: string;
  email?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  image?: string;
  rating: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

export type Language = 'pl' | 'en';
export type Theme = 'light' | 'dark';
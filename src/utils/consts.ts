import { ThemeVariant } from './types';
// Setting all the theme variants
export const themes = [
  {
    id: 'cyber' as ThemeVariant,
    name: 'Cyber Blue',
    preview: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    description: 'Tech-forward cyan & blue',
  },
  {
    id: 'neon' as ThemeVariant,
    name: 'Neon Matrix',
    preview: 'bg-gradient-to-r from-green-500 to-emerald-500',
    description: 'Cyberpunk green vibes',
  },
  {
    id: 'sunset' as ThemeVariant,
    name: 'Urban Sunset',
    preview: 'bg-gradient-to-r from-orange-500 to-red-500',
    description: 'Warm orange & red',
  },
  {
    id: 'vice' as ThemeVariant,
    name: 'Synthwave Vice',
    preview: 'bg-gradient-to-r from-purple-500 to-pink-500',
    description: 'Retro purple & pink',
  },
  {
    id: 'gold' as ThemeVariant,
    name: 'Gold Rush',
    preview: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    description: 'Luxury amber & gold',
  },
];

import { ThemeVariant } from './types';

export interface ThemeSwitcherProps {
  currentTheme: ThemeVariant;
  onThemeChange: (theme: ThemeVariant) => void;
}

export interface ThemeProps {
  primary: string;
  primaryHover: string;
  primaryGlow: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentHover: string;
  accentLight: string;
  accentBorderLight: string;
  secondary: string;
  secondaryBg: string;
  bgGlow1: string;
  bgGlow2: string;
  docGuide: string;
  docTech: string;
  docPractice: string;
}

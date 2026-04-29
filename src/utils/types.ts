import React from 'react';

export type ThemeVariant = 'cyber' | 'neon' | 'sunset' | 'vice' | 'gold';

export type ButtonType = {
  children: React.ReactNode;
  className?: string;
  size: 'sm' | 'md' | 'lg';
};

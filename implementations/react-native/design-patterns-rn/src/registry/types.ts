import React from 'react';

export type Category = 'Creational' | 'Structural' | 'Behavioral';

export type PatternEntry = {
  id: string;
  name: string;
  category: Category;
  Component: React.ComponentType;    // demo component
  markdown?: string;                 // short explanation (optional)
};

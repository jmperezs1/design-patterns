export const CATEGORIES: Array<'Creational' | 'Structural' | 'Behavioral'> = [
  'Creational', 'Structural', 'Behavioral'
];

export const CATEGORY_ORDER = CATEGORIES;

export const CATEGORY_ICONS: Record<(typeof CATEGORIES)[number], string> = {
  Creational: 'hammer-wrench',
  Structural: 'family-tree',
  Behavioral: 'brain',
};

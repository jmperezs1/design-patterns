import { FactoryDemo } from '../patterns/creational/factory';
import { PatternEntry } from './types';
import React from 'react';

export const patterns: PatternEntry[] = [
  {
    id: 'factory',
    name: 'Factory',
    category: 'Creational',
    Component: FactoryDemo, 
    markdown:
      'Centraliza la creación de objetos/elementos a partir de un *variant*, ocultando los detalles de construcción.',
  },
];

// helpers
export function groupByCategory(entries = patterns) {
  const map = new Map<string, PatternEntry[]>();
  for (const p of entries) {
    if (!map.has(p.category)) map.set(p.category, []);
    map.get(p.category)!.push(p);
  }
  for (const list of map.values()) list.sort((a,b) => a.name.localeCompare(b.name));
  return Array.from(map.entries()).map(([category, data]) => ({ category, data }));
}

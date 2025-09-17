import { factoryDemoSource } from '../patterns/creational/code/demo';
import { kFactorySource } from '../patterns/creational/code/factory';
import { FactoryDemo } from '../patterns/creational/factory-demo';
import { PatternEntry } from './types';

export const patterns: PatternEntry[] = [
    {
    id: 'factory',
    name: 'Factory',
    category: 'Creational',
    Component: FactoryDemo,
    markdown:
      'Centraliza la creación de objetos/elementos a partir de un *variant*, ocultando los detalles de construcción.',
    codeSnippets: [
      { title: 'factory.ts', code: kFactorySource, language: 'tsx' },
      { title: 'factory-demo.tsx', code: factoryDemoSource, language: 'tsx' },
    ],
  },
];

export function groupByCategory(entries = patterns) {
  const map = new Map<string, PatternEntry[]>();
  for (const p of entries) {
    if (!map.has(p.category)) map.set(p.category, []);
    map.get(p.category)!.push(p);
  }
  for (const list of map.values()) list.sort((a,b) => a.name.localeCompare(b.name));
  return Array.from(map.entries()).map(([category, data]) => ({ category, data }));
}

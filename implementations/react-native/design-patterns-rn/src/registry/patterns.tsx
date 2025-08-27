import { PatternEntry } from './types';
import React from 'react';

// Simple stub component for demo purposes
function PatternStub({ name }: { name: string }) {
  return <div style={{ padding: 16, color: '#555' }}>Demo for {name} pattern</div>;
}

export const patterns: PatternEntry[] = [
  {
    id: 'factory',
    name: 'Factory',
    category: 'Creational',
    Component: () => <PatternStub name="Factory" />, 
    markdown:
      'Centraliza la creación de objetos/elementos a partir de un *variant*, ocultando los detalles de construcción.',
  },
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    Component: () => <PatternStub name="Singleton" />, 
    markdown:
      'Asegura que exista **una única instancia** y un punto de acceso global (e.g., servicio de API).',
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

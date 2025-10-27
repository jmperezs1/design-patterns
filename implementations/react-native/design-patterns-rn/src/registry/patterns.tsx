import { factoryDemoSource } from '../patterns/creational/code/demo';
import { kFactorySource } from '../patterns/creational/code/factory';
import { FactoryDemo } from '../patterns/creational/factory/demo';
import { PatternEntry } from './types';
import { ClientListRN } from '../patterns/structural/adapter/client';
import { Adapter } from '../patterns/structural/adapter/adapter';
import { Adaptee } from '../patterns/structural/adapter/adaptee';
import { BridgeDemoRN } from '../patterns/structural/bridge/components/bridge-demo';
import { SingletonDemo } from '../patterns/creational/singleton/demo';
import { BuilderDemo } from '../patterns/creational/builder/demo';
import { PrototypeDemo } from '../patterns/creational/prototype/demo';
import { AbstractFactoryDemo } from '../patterns/creational/abstract-factory/demo';
import { CommandDemo } from '../patterns/behavioral/command/demo';
import { StateDemo } from '../patterns/behavioral/state/demo';
import { StrategyDemo } from '../patterns/behavioral/strategy/demo';

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
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'Structural',
    Component: (() => <ClientListRN api={new Adapter(new Adaptee())} pageSize={6} />) as any,
    markdown:
      'Adapter permite que dos interfaces incompatibles trabajen juntas envolviendo un objeto existente con la interfaz esperada por el cliente. Aquí transformamos un CSV en una lista tipada de usuarios.',
    codeSnippets: [
      { title: 'adaptee.ts', code: "export class Adaptee {\\n  async specificRequest(): Promise<string> {\\n    return 'id,name,email\\\\n1,Juan Perez,juanperez@example.com';\\n  }\\n}", language: 'ts' },
      { title: 'adapter.ts', code: "export class Adapter { /* parse CSV -> User[] */ }", language: 'ts' },
      { title: 'client.tsx', code: "export const ClientListRN = () => {/* ... */}", language: 'tsx' },
    ],
  },
  {
    id: 'bridge',
    name: 'Bridge',
    category: 'Structural',
    Component: BridgeDemoRN as any,
    markdown:
      'Bridge desacopla una abstracción de su implementación, permitiendo combinarlas libremente. Reportes (Órdenes/Inventario) × Exportadores (CSV/JSON), sin crear clases por combinación.',
    codeSnippets: [
      { title: 'abstraction.ts', code: 'export abstract class Report { /* ... */ }', language: 'ts' },
      { title: 'implementor.ts', code: 'export interface Exporter { /* ... */ }', language: 'ts' },
      { title: 'components/bridge-demo.tsx', code: 'export const BridgeDemoRN = () => {/* ... */}', language: 'tsx' },
    ],
  },
  {
    id: 'abstract_factory',
    name: 'Abstract Factory',
    category: 'Creational',
    Component: AbstractFactoryDemo,
    markdown: 'Crea familias de productos relacionados (Button, Badge) sin acoplar el código cliente a implementaciones concretas.',
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'Creational',
    Component: BuilderDemo,
    markdown: 'Separa la construcción de un objeto complejo de su representación. Permite construir variantes paso a paso.',
  },
  {
    id: 'prototype',
    name: 'Prototype',
    category: 'Creational',
    Component: PrototypeDemo,
    markdown: 'Crea nuevos objetos copiando (clonando) un prototipo existente; útil para evitar costos de creación o mantener estados iniciales.',
  },
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    Component: SingletonDemo,
    markdown: 'Garantiza una única instancia global con un punto de acceso controlado.',
  },
  {
    id: 'command',
    name: 'Command',
    category: 'Behavioral',
    Component: CommandDemo,
    markdown: 'Encapsula una petición como un objeto. Permite parametrizar invocaciones y desacoplar UI del receptor.',
  },
  {
    id: 'state',
    name: 'State',
    category: 'Behavioral',
    Component: StateDemo,
    markdown: 'Permite cambiar el comportamiento de un objeto cuando su estado interno cambia.',
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    Component: StrategyDemo,
    markdown: 'Define una familia de algoritmos intercambiables (por ejemplo, descuentos) encapsulados y conmutables en tiempo de ejecución.',
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

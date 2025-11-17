import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import VisitorDemo from './client';

// Raw code
import elementIface from './element.ts?raw';
import elementBook from './element-book.ts?raw';
import elementElectronics from './element-electronics.ts?raw';
import elementGrocery from './element-grocery.ts?raw';
import visitorIface from './visitor.ts?raw';
import totalVisitor from './visitor-total-price.ts?raw';
import shippingVisitor from './visitor-delivery.ts?raw';
import csvVisitor from './visitor.csv.ts?raw';
import clientCode from './client.tsx?raw';

export default {
  title: 'Design Patterns/Behavioral/Visitor Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'Visitor permite agregar operaciones a una jerarquía de clases sin modificarlas, encapsulando las operaciones en objetos “Visitantes”.'
      }
    }
  }
} as Meta;

export const Implementation: StoryFn = () => (
  <Box className="space-y-8" p="3">
    {/* Header */}
    <Flex align="center" gap="3" className="flex-wrap">
      <h3 className="text-2xl font-semibold tracking-tight">Visitor Pattern</h3>
      <Badge variant="soft" color="cyan">Comportamental</Badge>
    </Flex>

    {/* Resumen */}
    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
      <strong>Visitor</strong> separa algoritmos de las estructuras de objetos sobre las que operan. Los elementos exponen <code>accept()</code> y delegan la operación al visitante adecuado.
    </p>

    <Separator size="4" />

    {/* Problemática / Solución General */}
    <section className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          Agregar nuevas operaciones a una jerarquía existente implica modificar todas las clases, aumentando el acoplamiento y el riesgo de errores.
        </p>
      </div>
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
        <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
          Definir una interfaz <strong>Visitor</strong> con métodos por tipo concreto (<code>visitBook</code>, <code>visitElectronics</code>, etc.). Los elementos implementan <code>accept(v)</code> y no cambian cuando agregamos nuevos visitantes.
        </p>
      </div>
    </section>

    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/real_visitor.png" alt="Visitor UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Relación entre Director, Builder, ConcreteBuilder y Producto.</figcaption>
          </figure>
        </div>

    {/* Caso Específico */}
    <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
      <header className="flex items-center gap-3 flex-wrap">
        <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Carrito con Operaciones</h4>
        <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
      </header>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Descripción</h5>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Elementos: <code>Book</code>, <code>Electronics</code>, <code>Grocery</code>. Visitantes: <code>TotalPriceVisitor</code> (subtotal/impuestos/total), <code>ShippingEstimatorVisitor</code> (envío) y <code>CsvExportVisitor</code> (exportación).
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/visitor.png" alt="Visitor UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Relación entre Director, Builder, ConcreteBuilder y Producto.</figcaption>
          </figure>
        </div>

      {/* Código Fuente */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
        <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
          <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver elementos, visitantes y cliente</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
          </summary>
          <div className="p-4 space-y-4">
            <CodeBlock code={elementIface} title="element.ts" />
            <CodeBlock code={visitorIface} title="visitor.ts" />
            <CodeBlock code={elementBook} title="element-book.ts" />
            <CodeBlock code={elementElectronics} title="element-electronics.ts" />
            <CodeBlock code={elementGrocery} title="element-grocery.ts" />
            <CodeBlock code={totalVisitor} title="visitor-total-price.ts" />
            <CodeBlock code={shippingVisitor} title="visitor-delivery.ts" />
            <CodeBlock code={csvVisitor} title="visitor.csv.ts" />
            <CodeBlock code={clientCode} title="client.tsx" />
          </div>
        </details>
      </div>
    </section>
  </Box>
);

export const Playground: StoryFn = () => (
  <div className="space-y-5">
    <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
      <strong>Cómo interactuar:</strong> Agrega ítems de diferentes tipos y aplica las operaciones: “Calcular Totales”, “Estimar Envío” y “Exportar CSV”.
    </div>
    <VisitorDemo />
  </div>
);

Playground.parameters = {
  docs: {
    description: {
      story: 'Los elementos no cambian cuando agregas nuevas operaciones: sólo defines un nuevo Visitante y cada elemento lo acepta en su método accept().' 
    }
  }
};

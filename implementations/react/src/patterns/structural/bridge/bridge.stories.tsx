import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import BridgeDemoRadix from './components/export-demo';

// Raw source imports
import abstractionCode from './abstraction.ts?raw';
import implementorCode from './implementor.ts?raw';
import csvCode from './csv-implementor.ts?raw';
import jsonCode from './json-implementor.ts?raw';
import ordersCode from './order-abstraction.ts?raw';
import inventoryCode from './inventory-abstraction.ts?raw';
import demoCode from './components/export-demo.tsx?raw';

export default {
  title: 'Design Patterns/Structural/Bridge Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'Bridge desacopla la Abstracción (Report) de su Implementación (Exporter) para combinarlas libremente. Así evitamos una explosión de subclases y podemos variar “qué se exporta” y “cómo se exporta” de forma independiente.',
      },
    },
  },
} as Meta;

export const Implementation: StoryFn = () => {
  return (
    <Box className="space-y-8" p="3">
      {/* Header */}
      <Flex align="center" gap="3" className="flex-wrap">
        <h3 className="text-2xl font-semibold tracking-tight">Bridge Pattern</h3>
        <Badge variant="soft" color="orange">Estructural</Badge>
      </Flex>

      {/* Resumen */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        <strong>Bridge</strong> permite conectar dos partes de un sistema que pueden variar de forma independiente (abstracción e implementación), evitando que una dependa directamente de la otra mediante herencia.
      </p>

      <Separator size="4" />

      {/* Problemática / Solución General */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            Cuando un sistema necesita combinar dos dimensiones de variación (por ejemplo tipo + formato, o dispositivo + sistema operativo), la herencia tradicional obliga a crear muchas clases combinadas, generando duplicación y falta de flexibilidad.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            Separar ambas dimensiones en jerarquías distintas y enlazarlas mediante composición (un “puente”), para poder extender una sin tocar la otra.
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/real_bridge.png" alt="Bridge UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
          </figure>
        </div>

      {/* Caso Específico */}
      <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
        <header className="flex items-center gap-3 flex-wrap">
          <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Export de órdenes e inventario</h4>
          <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
        </header>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Necesitamos exportar <em>órdenes</em> o <em>inventario</em> a distintos formatos (CSV/JSON) sin duplicar lógica y sin
            crear subclases por cada combinación.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            <code>OrdersReport</code> y <code>InventoryReport</code> (abstracciones) reciben un <code>Exporter</code> concreto (<code>CsvExporter</code>,
            <code>JsonExporter</code>) y delegan la serialización. Cambiar el exportador no afecta el flujo del reporte.
          </p>
        </div>

        {/* UML */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/bridge.png" alt="Bridge UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Abstracción (Report) e Implementaciones (Exporter) desacopladas.</figcaption>
          </figure>
        </div>

        {/* Código Fuente */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
          <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
            <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces e implementaciones</span>
              <span className="ml-auto text:[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
              <span className="ml-auto text:[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
            </summary>
            <div className="p-4 space-y-4">
              <CodeBlock code={abstractionCode} title="abstraction.ts" />
              <CodeBlock code={implementorCode} title="implementor.ts" />
              <CodeBlock code={ordersCode} title="order-abstraction.ts" />
              <CodeBlock code={inventoryCode} title="inventory-abstraction.ts" />
              <CodeBlock code={csvCode} title="csv-implementor.ts" />
              <CodeBlock code={jsonCode} title="json-implementor.ts" />
              <CodeBlock code={demoCode} title="components/export-demo.tsx" />
            </div>
          </details>
        </div>
      </section>
    </Box>
  );
};
Implementation.parameters = {
  docs: {
    description: {
      story: 'Documentación y código del patrón Bridge. El Playground permite combinar reportes y exportadores dinámicamente.'
    }
  }
};

export const Playground: StoryFn = () => {
  return (
    <div className="space-y-5">
      <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
        <strong>Cómo interactuar:</strong> Selecciona un <em>Reporte</em> y un <em>Exportador</em> y presiona “Exportar”. La abstracción
        del reporte delega el formato al exportador elegido.
      </div>
      <BridgeDemoRadix />
    </div>
  );
};
Playground.parameters = {
  docs: {
    description: {
      story: 'Playground interactivo: selecciona tipo de reporte y formato de exportación para generar el archivo resultante.'
    }
  }
};

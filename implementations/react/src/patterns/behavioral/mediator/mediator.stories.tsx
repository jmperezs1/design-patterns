import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import MediatorDemo from './client';

// Raw code
import mediatorIface from './mediator.ts?raw';
import colleagueBase from './colleague.ts?raw';
import collA from './concrete-colleague-a.ts?raw';
import collB from './concrete-colleague-b.ts?raw';
import collC from './concrete-colleague-c.ts?raw';
import collD from './concrete-colleague-d.ts?raw';
import concreteMediator from './concrete-mediator.ts?raw';
import typeCode from './types/type.ts?raw';
import clientCode from './client.tsx?raw';

export default {
  title: 'Design Patterns/Behavioral/Mediator Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'Mediator reduce el acoplamiento entre componentes haciendo que se comuniquen a través de un objeto mediador, en lugar de referenciarse entre sí.'
      }
    }
  }
} as Meta;

export const Implementation: StoryFn = () => (
  <Box className="space-y-8" p="3">
    {/* Header */}
    <Flex align="center" gap="3" className="flex-wrap">
      <h3 className="text-2xl font-semibold tracking-tight">Mediator Pattern</h3>
      <Badge variant="soft" color="cyan">Comportamental</Badge>
    </Flex>

    {/* Resumen */}
    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
      <strong>Mediator</strong> centraliza la comunicación entre colegas. Cada componente notifica al mediador, que decide cómo reaccionan los demás, reduciendo dependencias directas.
    </p>

    <Separator size="4" />

    {/* Problemática / Solución General */}
    <section className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          Componentes con referencias cruzadas se vuelven frágiles y difíciles de mantener. Cualquier cambio en uno rompe a los demás y el flujo está disperso.
        </p>
      </div>
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
        <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
          Introducir un <strong>Mediador</strong> que orquesta las reacciones. Los colegas no se conocen entre sí; sólo notifican eventos al mediador, que aplica reglas y coordina efectos.
        </p>
      </div>
    </section>

    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/real_mediator.png" alt="Mediator UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
					</figure>
				</div>

    {/* Caso */}
    <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
      <header className="flex items-center gap-3 flex-wrap">
        <h4 className="text-lg font-semibold tracking-tight">Caso: Buscador con Filtro</h4>
        <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
      </header>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Un buscador con múltiples controles (texto, filtro de categoría, limpiar) tiende a acoplar componentes: el input actualiza la lista, el filtro también, y el botón debe resetear ambos.
        </p>
      </div>

      <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
        <p className="text-sm text-indigo-900 dark:text-indigo-200">
          Cuatro colegas: <code>SearchBox</code> (A), <code>ResultsList</code> (B), <code>CategoryFilter</code> (C) y <code>ClearButton</code> (D). El <strong>mediador</strong> coordina: cambios en A o C refrescan B; D limpia A y C y luego refresca B.
        </p>
      </div>

      {/* Código Fuente */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
        <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
          <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces, colegas, mediador y cliente</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
          </summary>
          <div className="p-4 space-y-4">
            <CodeBlock code={mediatorIface} title="mediator.ts" />
            <CodeBlock code={colleagueBase} title="colleague.ts" />
            <CodeBlock code={collA} title="concrete-colleague-a.ts" />
            <CodeBlock code={collB} title="concrete-colleague-b.ts" />
            <CodeBlock code={collC} title="concrete-colleague-c.ts" />
            <CodeBlock code={collD} title="concrete-colleague-d.ts" />
            <CodeBlock code={concreteMediator} title="concrete-mediator.ts" />
            <CodeBlock code={typeCode} title="types/type.ts" />
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
      <strong>Cómo interactuar:</strong> Escribe en “Buscar”, cambia “Categoría” y usa “Limpiar”. Observa el “Registro del Mediador” para ver cómo reacciona a eventos A, B, C y D.
    </div>
    <MediatorDemo />
  </div>
);

Playground.parameters = {
  docs: {
    description: {
      story: 'A y C disparan un refresco de B; D limpia A y C. Los colegas no se conocen, sólo notifican al mediador.'
    }
  }
};

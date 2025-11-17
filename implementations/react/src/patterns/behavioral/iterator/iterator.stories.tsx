import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import IteratorDemo from './client';

// Raw code
import iteratorIface from './iterator.ts?raw';
import aggregateIface from './aggregate.ts?raw';
import concreteAggregate from './concrete-aggregate.ts?raw';
import concreteIterator from './concrete-iterator.ts?raw';
import typesFile from './types/type.ts?raw';
import clientCode from './client.tsx?raw';

export default {
  title: 'Design Patterns/Behavioral/Iterator Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'Iterator proporciona una forma de acceder secuencialmente a los elementos de una colección sin exponer su representación interna.'
      }
    }
  }
} as Meta;

export const Implementation: StoryFn = () => (
  <Box className="space-y-8" p="3">
    <Flex align="center" gap="3" className="flex-wrap">
      <h3 className="text-2xl font-semibold tracking-tight">Iterator Pattern</h3>
      <Badge variant="soft" color="cyan">Comportamental</Badge>
    </Flex>

    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
      <strong>Iterator</strong> separa la responsabilidad de recorrer una colección de la propia colección, permitiendo múltiples iteradores independientes.
    </p>

    <Separator size="4" />

    {/* Problemática / Solución General */}
    <section className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          Cuando diferentes clientes necesitan recorrer una colección de formas distintas (adelante, atrás, saltando elementos) introducir esa lógica dentro de la colección rompe la separación de responsabilidades y hace más difícil soportar múltiples recorridos.
        </p>
      </div>
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
        <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
          Extraer la lógica de recorrido a un objeto iterador que implemente una interfaz común. La colección expone un método para crear iteradores, permitiendo múltiples instancias que recorren la misma estructura independientemente.
        </p>
      </div>
    </section>

    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
      <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
      <figure>
        <img src="/img/real_iterator.png" alt="Iterator UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
      </figure>
    </div>

    <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
      <header className="flex items-center gap-3 flex-wrap">
        <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Playlist</h4>
        <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
      </header>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Descripción</h5>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          La <code>Playlist</code> expone un iterador que recorre canciones. El iterador soporta operaciones: <code>next</code>, <code>hasNext</code>, <code>remove</code> y <code>reset</code>.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/iterator.png" alt="Iterator UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
					</figure>
				</div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
        <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
          <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces, agregado, iterador y cliente</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
          </summary>
          <div className="p-4 space-y-4">
            <CodeBlock code={iteratorIface} title="iterator.ts" />
            <CodeBlock code={aggregateIface} title="aggregate.ts" />
            <CodeBlock code={concreteAggregate} title="concrete-aggregate.ts" />
            <CodeBlock code={concreteIterator} title="concrete-iterator.ts" />
            <CodeBlock code={typesFile} title="types/type.ts" />
            <CodeBlock code={clientCode} title="client.tsx" />
          </div>
        </details>
      </div>

    </section>
  </Box>
);

Implementation.parameters = {
  docs: {
    description: {
      story: 'Documentación y código del patrón Iterator. La parte interactiva vive en el Playground.'
    }
  }
};

export const Playground: StoryFn = () => (
  <div className="space-y-5">
    <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
      <strong>Cómo interactuar:</strong> Añade canciones, crea un iterador y avanza con "Siguiente". Usa "Eliminar" para quitar la canción actualmente retornada por el iterador y "Reiniciar" para volver al inicio.
    </div>
    <IteratorDemo />
  </div>
);

Playground.parameters = {
  docs: {
    description: {
      story: 'Iterator permite múltiples recorridos independientes sobre la misma colección sin exponer su estructura interna.'
    }
  }
};

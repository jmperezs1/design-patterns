import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Adaptee } from './adaptee';
import { Adapter } from './adapter';
import { ClientTableRadix } from './client';
import { CodeBlock } from '../../../components/code-block';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';

// raw source imports
import targetCode from './target.tsx?raw';
import adapteeCode from './adaptee.ts?raw';
import adapterCode from './adapter.ts?raw';
import clientCode from './client.tsx?raw';
import userInterfaceCode from './interfaces/user.ts?raw';

export default {
  title: 'Design Patterns/Structural/Adapter Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'Adapter permite que interfaces incompatibles colaboren sin tocar el código legacy ni el cliente. El Adapter implementa la interfaz Target y traduce del formato del Adaptee al esperado por el cliente.',
      },
    },
  },
} as Meta;

export const Implementation: StoryFn = () => {
  return (
    <Box className="space-y-8" p="3">
      {/* Header */}
      <Flex align="center" gap="3" className="flex-wrap">
        <h3 className="text-2xl font-semibold tracking-tight">Adapter Pattern</h3>
        <Badge variant="soft" color="orange">Estructural</Badge>
      </Flex>

      {/* Resumen */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        <strong>Adapter</strong> es un patrón que sirve para conectar dos cosas que no encajan entre sí, actuando como un traductor entre interfaces incompatibles.
      </p>

      <Separator size="4" />

      {/* Problemática / Solución General */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            A veces queremos reutilizar una clase o servicio, pero su forma de trabajar (su interfaz) no coincide con lo que necesita nuestro sistema, por lo que no se pueden comunicar directamente.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            Crear un componente intermedio (el adaptador) que recibe las llamadas en el formato que espera el cliente y las convierte al formato que entiende el servicio real, permitiendo que trabajen juntos sin modificarlos.
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/real_adapter.png" alt="Adapter UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
          </figure>
        </div>

      {/* Caso Específico */}
      <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
        <header className="flex items-center gap-3 flex-wrap">
          <h4 className="text-lg font-semibold tracking-tight">Caso Específico: CSV → User[]</h4>
          <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
        </header>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            El sistema legacy devuelve un string CSV, mientras que el cliente espera un arreglo de <code>User</code> tipado.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            El <em>Adapter</em> traduce CSV → <code>User[]</code> implementando <code>Target</code>. El cliente sólo conoce <code>Target</code> y permanece desacoplado.
          </p>
        </div>

        {/* UML */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/adapter.png" alt="Adapter UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Target, Adapter y Adaptee.</figcaption>
          </figure>
        </div>

        {/* Código Fuente */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
          <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
            <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces e implementaciones</span>
              <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
              <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
            </summary>
            <div className="p-4 space-y-4">
              <CodeBlock code={userInterfaceCode} title="interfaces/user.ts" />
              <CodeBlock code={targetCode} title="target.tsx" />
              <CodeBlock code={adapteeCode} title="adaptee.ts" />
              <CodeBlock code={adapterCode} title="adapter.ts" />
              <CodeBlock code={clientCode} title="client.tsx" />
            </div>
          </details>
        </div>
      </section>
    </Box>
  );
};

export const Playground: StoryFn = () => {
  const adaptee = React.useMemo(() => new Adaptee(), []);
  const adapter = React.useMemo(() => new Adapter(adaptee), [adaptee]);
  const [csv, setCsv] = React.useState<string>("");
  React.useEffect(() => {
    let stop = false;
    adaptee.specificRequest().then((raw) => {
      if (!stop) setCsv(raw);
    });
    return () => { stop = true; };
  }, [adaptee]);
  return (
    <div className="space-y-5">
      <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
        <strong>Cómo interactuar:</strong> A la izquierda se muestra la <em>fuente CSV</em> que entrega el Adaptee; a la derecha,
        el <em>Cliente</em> consume el <em>Adapter</em> (que implementa Target) y renderiza una tabla tipada. Usa el buscador
        y la paginación para explorar los datos adaptados.
      </div>
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-3">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Fuente (Adaptee) — CSV</div>
          <pre className="text-xs leading-relaxed whitespace-pre overflow-auto p-3 rounded-lg bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-gray-800 max-h-72">
{csv ? csv : 'Cargando CSV…'}
          </pre>
        </div>
        <ClientTableRadix api={adapter} pageSize={5} />
      </div>
    </div>
  );
};
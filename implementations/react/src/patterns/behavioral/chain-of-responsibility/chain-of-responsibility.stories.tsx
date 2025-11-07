import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import ChainOfResponsibilityDemo from './client';

// Raw code
import handlerCode from './handler.ts?raw';
import baseHandlerCode from './base-handler.ts?raw';
import h1Code from './concrete-handler-1.ts?raw';
import h2Code from './concrete-handler-2.ts?raw';
import h3Code from './concrete-handler-3.ts?raw';
import h4Code from './concrete-handler-4.ts?raw';
import h5Code from './concrete-handler-5.ts?raw';
import typesCode from './types/types.ts?raw';
import clientCode from './client.tsx?raw';

export default {
  title: 'Design Patterns/Behavioral/Chain of Responsibility',
  parameters: {
    docs: {
      description: {
        component:
          'La Cadena de Responsabilidad permite que múltiples manejadores tengan la oportunidad de procesar una solicitud, pasando la petición a lo largo de una cadena hasta que uno la maneje.'
      }
    }
  }
} as Meta;

export const Implementation: StoryFn = () => (
  <Box className="space-y-8" p="3">
    {/* Header */}
    <Flex align="center" gap="3" className="flex-wrap">
      <h3 className="text-2xl font-semibold tracking-tight">Chain of Responsibility</h3>
      <Badge variant="soft" color="cyan">Comportamental</Badge>
    </Flex>

    {/* Resumen */}
    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
      <strong>Chain of Responsibility</strong> desacopla emisores y receptores permitiendo que varios manejadores intenten procesar la solicitud. Cada manejador decide si la atiende o la delega al siguiente.
    </p>

    <Separator size="4" />

    {/* Problemática / Solución General */}
    <section className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          Reglas de ruteo condicionales se vuelven rígidas y difíciles de mantener cuando todo está en un único bloque condicional.
        </p>
      </div>
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
        <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
          Encadenar manejadores con una interfaz común. Cada uno decide si procesa o delega; así las reglas se separan y se pueden reordenar/componer.
        </p>
      </div>
    </section>

    {/* Caso Específico */}
    <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
      <header className="flex items-center gap-3 flex-wrap">
        <h4 className="text-lg font-semibold tracking-tight">Caso: Mesa de Ayuda</h4>
        <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
      </header>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Descripción</h5>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Tickets se enrutan a través de: AutoResuelveFAQ → EquipoSeguridad → SoporteNivel1 → SoporteNivel2 → EscalamientoGerencia.
          Cada manejador aplica su criterio; si no corresponde, pasa al siguiente.
        </p>
      </div>

      {/* Código Fuente */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
        <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
          <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces, handlers y cliente</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
          </summary>
          <div className="p-4 space-y-4">
            <CodeBlock code={handlerCode} title="handler.ts" />
            <CodeBlock code={baseHandlerCode} title="base-handler.ts" />
            <CodeBlock code={h1Code} title="concrete-handler-1.ts" />
            <CodeBlock code={h2Code} title="concrete-handler-2.ts" />
            <CodeBlock code={h3Code} title="concrete-handler-3.ts" />
            <CodeBlock code={h4Code} title="concrete-handler-4.ts" />
            <CodeBlock code={h5Code} title="concrete-handler-5.ts" />
            <CodeBlock code={typesCode} title="types/types.ts" />
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
      <strong>Cómo interactuar:</strong> Completa el ticket y presiona “Enviar por la cadena”. Prueba los atajos (FAQ, Seguridad, L1, L2, Manager) para ver cómo cambia la ruta de la cadena.
    </div>
    <ChainOfResponsibilityDemo />
  </div>
);

Playground.parameters = {
  docs: {
    description: {
      story: 'Cada manejador decide si procesa el ticket o lo pasa al siguiente. Observa la “Ruta en la cadena” para entender qué nodos evaluaron el caso.'
    }
  }
};

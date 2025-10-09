import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import EmailTemplateStudio from './client';
// Raw sources
import prototypeCode from './prototype.ts?raw';
import concretePrototypeCode from './concrete-prototype.tsx?raw';
import clientCode from './client.tsx?raw';

export default {
  title: 'Design Patterns/Creational/Prototype Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'El patrón **Prototype** permite crear nuevos objetos clonando prototipos existentes y aplicando pequeños overrides. Útil cuando la construcción es costosa o repetitiva y queremos variaciones rápidas y consistentes.',
      },
    },
  },
} as Meta;

export const Implementation: StoryFn = () => {
  return (
    <Box className="space-y-8" p="3">
      {/* Header */}
      <Flex align="center" gap="3" className="flex-wrap">
        <h3 className="text-2xl font-semibold tracking-tight">Prototype Pattern</h3>
        <Badge variant="soft" color="indigo">Creacional</Badge>
      </Flex>

      {/* Resumen */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        En <strong>Prototype</strong> no ensamblas paso a paso: partes de un prototipo listo y lo <b>clonas</b> con
        overrides mínimos. Así heredas defaults consistentes, reduces branching y generas variaciones de forma rápida.
      </p>

      <Separator size="4" />

      {/* Problemática / Solución General */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            Cuando crear un objeto requiere muchos valores por defecto, plantillas HTML o estructuras repetitivas, cada
            nueva variante implica copiar/pegar y ajustar campos manualmente, con riesgo de inconsistencias.
          </p>
          <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-100/90">
            Si además la construcción es costosa (cálculos, parseos), repetirla desde cero penaliza rendimiento y mantenimiento.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            Definir prototipos base y exponer una operación de <em>clone</em> que devuelve copias listas para aplicar overrides
            puntuales. El cliente no conoce la clase concreta: trabaja contra la interfaz <code>Prototype&lt;T&gt;</code>.
          </p>
          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-100/90">
            Beneficios: velocidad para crear variaciones, consistencia de defaults y menor riesgo de drift entre versiones.
          </p>
        </div>
      </section>

      {/* Caso Específico */}
      <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
        <header className="flex items-center gap-3 flex-wrap">
          <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Plantillas de Email</h4>
          <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
        </header>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Emails como <em>welcome</em>, <em>reset password</em> o <em>newsletter</em> comparten estructura y estilos, pero
            cambian algunos textos y colores. Mantenerlos por copia conduce a divergencias y errores.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            Se definen prototipos para cada plantilla base y se clonan aplicando overrides mínimos (subject, colores, secciones). Un
            componente cliente orquesta la selección, los overrides y la vista previa renderizada.
          </p>
        </div>

        {/* UML */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/prototype.png" alt="Prototype UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Interfaz Prototype, ConcretePrototype y Cliente.</figcaption>
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
              <CodeBlock code={prototypeCode} title="prototype.ts" />
              <CodeBlock code={concretePrototypeCode} title="concrete-prototype.tsx" />
              <CodeBlock code={clientCode} title="client.tsx" />
            </div>
          </details>
        </div>
      </section>
    </Box>
  );
};

export const Playground: StoryFn = () => {
  return (
    <div className="space-y-5">
      <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
        <strong>Cómo interactuar:</strong> Selecciona una plantilla base, aplica overrides (texto/colores/secciones) y clona para añadir al Outbox. Todo el flujo usa Prototype: el cliente clona prototipos y materializa el email final.
      </div>
      <EmailTemplateStudio />
    </div>
  );
};

import type { Meta, StoryFn } from '@storybook/react';

import { Card } from './product-card';
import { CardDirector } from './director';
import { CardConcreteBuilder } from './concrete-builder';
import { CodeBlock } from '../../../components/code-block';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';

// raw sources
// Vite `?raw` loader to show code
// If your bundler differs, adjust import accordingly
import builderCode from './builder.tsx?raw';
import concreteBuilderCode from './concrete-builder.tsx?raw';
import directorCode from './director.tsx?raw';
import productCardCode from './product-card.tsx?raw';

export default {
  title: 'Design Patterns/Creational/Builder Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'El patrón **Builder** separa la construcción de un objeto complejo de su representación. Permite crear productos paso a paso, con orden controlado y partes opcionales, sin que el cliente conozca los detalles internos.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', table: { type: { summary: 'string' } } },
    subtitle: { control: 'text', table: { type: { summary: 'string' } } },
    mediaUrl: { control: 'text', table: { type: { summary: 'string' } } },
    body: { control: 'text', table: { type: { summary: 'ReactNode | string' } } },
    footer: { control: 'text', table: { type: { summary: 'ReactNode | string' } } },
  },
} as Meta;

type Args = {
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  body?: string;
  footer?: string;
};

export const Implementation: StoryFn<Args> = () => {
  return (
    <Box className="space-y-8" p="3">
      {/* Header */}
      <Flex align="center" gap="3" className="flex-wrap">
        <h3 className="text-2xl font-semibold tracking-tight">Builder Pattern</h3>
        <Badge variant="soft" color="indigo">Creacional</Badge>
      </Flex>

      {/* Resumen */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        <strong>Builder</strong> separa la construcción de un objeto complejo de su representación. Permite crear
        productos paso a paso, con orden y reglas bien definidas, dejando al cliente indicar qué partes quiere sin
        acoplarse a cómo se ensamblan. Ideal cuando el producto tiene secciones opcionales o variantes de armado.
      </p>

      <Separator size="4" />

      {/* Problemática / Solución General */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            Construir objetos con múltiples pasos y partes opcionales suele terminar en constructores enormes o en
            código cliente lleno de condicionales y orden de llamadas difícil de mantener. Esto degrada la legibilidad
            y hace frágil el proceso de armado ante cambios.
          </p>
          <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-100/90">
            Además, diferentes representaciones del mismo producto duplican lógica de construcción, dificultando reutilizar
            pasos comunes y estandarizar el flujo.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            Introducir un <em>Builder</em> con una API fluida para configurar partes y un <em>Director</em> que orquesta el
            orden de construcción. El cliente indica intención; el builder materializa los pasos. Esto reduce condicionales,
            hace explícitas las etapas y habilita reuso de secuencias.
          </p>
          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-100/90">
            Beneficios: claridad del pipeline de construcción, productos consistentes, posibilidad de múltiples
            representaciones con el mismo flujo de armado y fácil extensión de pasos.
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/real_builder.png" alt="Builder UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
          </figure>
        </div>

      {/* Caso Específico */}
      <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
        <header className="flex items-center gap-3 flex-wrap">
          <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Tarjeta de Producto (Card)</h4>
          <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
        </header>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Una tarjeta puede tener título, subtítulo, imagen, cuerpo y pie. No todas las secciones son obligatorias y el
            orden de armado importa.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            Definimos un <code>CardConcreteBuilder</code> con métodos para cada sección y un <code>CardDirector</code> que
            conoce el flujo recomendado. Pasando props opcionales, el director invoca los pasos necesarios y produce un
            objeto prop del producto listo para renderizar en <code>&lt;Card /&gt;</code>.
          </p>
        </div>

        {/* UML */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/builder.png" alt="Builder UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Relación entre Director, Builder, ConcreteBuilder y Producto.</figcaption>
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
              <CodeBlock code={builderCode} title="builder.tsx" />
              <CodeBlock code={concreteBuilderCode} title="concrete-builder.tsx" />
              <CodeBlock code={directorCode} title="director.tsx" />
              <CodeBlock code={productCardCode} title="product-card.tsx" />
            </div>
          </details>
        </div>
      </section>
    </Box>
  );
};

export const Playground = (args: Args) => {
    const director = new CardDirector();
    const builder = new CardConcreteBuilder();
    const product = director.construct(builder, {
        title: args.title,
        subtitle: args.subtitle,
        mediaUrl: args.mediaUrl,
        body: args.body ? <p>{args.body}</p> : undefined,
        footer: args.footer ? <button>{args.footer}</button> : undefined,
    });

    return (
    <div className="space-y-5 w-full">
      <h3 className="text-lg font-semibold">Builder Pattern</h3>
      <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
        <strong>Cómo interactuar:</strong> Cambia los campos <code>title</code>, <code>subtitle</code>, <code>mediaUrl</code>, <code>body</code> y <code>footer</code> desde el panel <em>Show addons</em>. El <code>Director</code> invoca los pasos del <code>Builder</code> y renderiza el resultado en la tarjeta.
      </div>
      <div className="rounded-lg border bg-white/70 dark:bg-zinc-900 p-4">
        <Card {...product} />
      </div>
    </div>
    );
};
Playground.args = {
    title: 'MacBook Pro 14"',
    subtitle: 'M3 Pro',
    mediaUrl:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    body: 'Pantalla Liquid Retina XDR y batería de larga duración.',
    footer: 'Comprar',
};
Playground.parameters = {
    docs: {
        description: {
      story:
        'Interactúa con los controles para construir diferentes variantes de la tarjeta usando Builder + Director.',
        },
    },
};

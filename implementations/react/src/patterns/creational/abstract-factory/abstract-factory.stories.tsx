"use client";

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from 'react';
import { Box, Flex, Separator, Badge } from '@radix-ui/themes';


type Mode = "toast" | "banner";

import toastFactoryCode from "./toast-factory.tsx?raw";
import bannerFactoryCode from "./banner-factory.tsx?raw";
import interfaceCode from "./notification-factory.tsx?raw";
import { CodeBlock } from "../../../components/code-block";
import type { Variant } from "./types/variants";
import { toastFactory } from './toast-factory';
import { bannerFactory } from './banner-factory';

export default {
  title: "Design Patterns/Creational/Abstract Factory",
  argTypes: {
    mode: {
      control: "select",
      options: ["toast", "banner"],
      table: {
        type: { summary: '"toast" | "banner"' },
        defaultValue: { summary: "toast" },
      },
    },
    variant: {
      control: "select",
      options: ["success", "alert", "informative", "warning"],
      table: {
        type: { summary: '"success" | "alert" | "informative" | "warning"' },
        defaultValue: { summary: "success" },
      },
    },
    title: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    description: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Escribe descripción aquí." },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Ejemplo de **Abstract Factory**: dos productos (Toast y Banner) comparten la misma familia de variantes. " +
          "El usuario elige `mode` (toast|banner) sin cambiar el resto del código que consume la fábrica.",
      },
    },
  },
} as Meta;

export const Implementation: StoryFn = () => {
  return (
    <Box className="space-y-8 max-w-5xl mx-auto" p="3">
      {/* Header */}
      <Flex align="center" gap="3" className="flex-wrap">
        <h3 className="text-2xl font-semibold tracking-tight">Abstract Factory Pattern</h3>
        <Badge color="indigo" variant="soft">Creacional</Badge>
        </Flex>

      {/* Resumen */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        <strong>Abstract Factory</strong> Es un patrón de diseño creacional que permite crear familias de objetos relacionados sin especificar sus clases concretas. El objetivo es evitar que el código de cliente dependa de clases específicas. En su lugar, trabaja con interfaces o tipos abstractos, delegando la creación a una fábrica especializada.
      </p>

      <Separator size="4" />

      {/* General Problem & Solution */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-3">Problemática General</h4>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 mb-2">Cuando un sistema debe generar distintos tipos de componentes o productos según el contexto (por ejemplo, diferentes interfaces, temas o plataformas), los desarrolladores suelen recurrir a condicionales y referencias directas a clases concretas, lo que genera código rígido, difícil de mantener y prácticamente imposible de extender sin modificar múltiples partes del sistema.</p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-3">Solución General</h4>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 mb-2">
            El patrón Abstract Factory plantea la creación de una capa de fábricas abstractas que encapsulan la lógica de instanciación, permitiendo reemplazar de forma transparente familias completas de objetos sin alterar el código que los utiliza.
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/real_abstract-factory.png" loading="lazy" alt="Abstract Factory UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" />

          </figure>
        </div>


      {/* Specific Case Wrapper */}
      <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
        <header className="flex items-center gap-3 flex-wrap">
          <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Sistema de Notificaciones</h4>
          <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
        </header>

        {/* Specific Problem */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Problemática Específica</h5>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <li>Dos presentaciones que dependen del gusto del usuario: <code>Toast</code> y <code>Banner</code>.</li>
            <li>Comparten mismas variantes (<code>success</code>, <code>alert</code>, <code>informative</code>, <code>warning</code>).</li>
            <li>Props diferentes por presentación pero intención funcional igual.</li>
          </ul>
        </div>

        {/* Specific Solution */}
        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-3">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            Se define <code>NotificationFactory&lt;TProps&gt;</code> con métodos para cada variante. Las fábricas concretas <code>toastFactory</code> y <code>bannerFactory</code> devuelven componentes tipados que encapsulan diferencias estructurales y de props, preservando un contrato uniforme para el consumidor.
          </p>
        </div>

        {/* UML */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/abstract-factory.png" loading="lazy" alt="Abstract Factory UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">
              Estructura aplicada al caso: interfaz, fábricas concretas y productos renderizados.
            </figcaption>
          </figure>
        </div>

        {/* Source Code */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Código Fuente</h5>
          <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
            <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces e implementaciones</span>
              <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
              <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
            </summary>
            <div className="p-4 space-y-4">
              <CodeBlock code={interfaceCode} title="notification-factory.tsx" />
              <CodeBlock code={toastFactoryCode} title="toast-factory.tsx" />
              <CodeBlock code={bannerFactoryCode} title="banner-factory.tsx" />
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
      story:
        "La **Abstract Factory** garantiza coherencia visual entre productos (Banner/Toast) al compartir la misma familia de variantes.",
    },
  },
};
// Playground interactivo (elige producto + variante)
interface PlaygroundArgs {
  mode: Mode;
  variant: Variant;
  title?: string;
  description?: string;
}

export const Playground: StoryFn<PlaygroundArgs> = (args) => {
  const [open, setOpen] = useState(true);
  const [lastSignature, setLastSignature] = useState<string>("");

  // Reabrir automáticamente al cambiar combinación mode+variant
  const signature = `${args.mode}::${args.variant}`;
  if (signature !== lastSignature) {
    setLastSignature(signature);
    if (args.mode === 'toast') {
      // re-open toast on variant/mode change
      setTimeout(() => setOpen(true), 0);
    }
  }

  const factory = args.mode === 'toast' ? toastFactory : bannerFactory;
  const element = (() => {
    switch (args.variant) {
      case 'success': return factory.createSuccess({ title: args.title, description: args.description, open, onOpenChange: setOpen } as any);
      case 'alert': return factory.createAlert({ title: args.title, description: args.description, open, onOpenChange: setOpen } as any);
      case 'informative': return factory.createInformative({ title: args.title, description: args.description, open, onOpenChange: setOpen } as any);
      case 'warning': return factory.createWarning({ title: args.title, description: args.description, open, onOpenChange: setOpen } as any);
      default: return null;
    }
  })();
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-md leading-relaxed text-indigo-900 dark:text-indigo-200">
        <strong>Cómo interactuar:</strong> Cambia los valores <code>mode</code> y <code>variant</code> usando el panel <em>Show addons</em> que es el primer boton en la parte superior derecha. Si el toast se cerró, pulsa el botón <em>Reabrir Toast</em> abajo. <br />
        Cada cambio fuerza la recreación de la variante sin modificar el flujo del cliente.
      </div>
      {args.mode === 'toast' && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-md border border-indigo-300 dark:border-indigo-700 bg-white/70 dark:bg-zinc-800 px-3 py-1.5 text-md font-medium text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-zinc-700 transition"
        >Reabrir Toast</button>
      )}
      <div>{element}</div>
    </div>
  );
};
Playground.args = {
  mode: 'toast',
  variant: 'success',
  title: '',
  description: 'Operación completada exitosamente.',
};
Playground.parameters = {
  docs: {
    description: {
      story: 'Playground para alternar entre las familias de productos creadas por la Abstract Factory.',
    },
  },
};



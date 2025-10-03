
"use client";

import type { Meta, StoryFn } from "@storybook/react";
import { useState } from 'react';


type Mode = "toast" | "banner";

import toastFactoryCode from "./toast-factory.tsx?raw";
import bannerFactoryCode from "./banner-factory.tsx?raw";
import interfaceCode from "./notification-factory.tsx?raw";
import { CodeBlock } from "../../../components/code-block";
import type { Variant } from "./types/variants";
import { Callout } from '@radix-ui/themes';
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Abstract Factory Pattern</h3>
      <p className="text-sm text-gray-600 mb-4 text-justify">
        Este módulo aplica el patrón **Abstract Factory** para crear familias de notificaciones con una interfaz genérica <code>NotificationFactory&lt;TProps&gt;</code> define `createSuccess`, `createAlert`, `createInformative` y `createWarning`; las fábricas concretas `bannerFactory` (delegando en `renderBanner`) y `toastFactory` (delegando en `renderToast`) generan componentes equivalentes por variante (`success`, `alert`, `informative`, `warning`) pero con presentación distinta; el tipado de props (`BannerProps`/`ToastProps`) asegura separación de responsabilidades y type-safety, el cliente consume una misma interfaz sin conocer implementaciones concretas, y el diseño facilita consistencia, testabilidad y escalabilidad al permitir agregar nuevas familias o variantes sin tocar el código cliente.
      </p>
      <Callout.Root className="mb-2">
        <Callout.Icon>💡</Callout.Icon>
        <Callout.Text>
          <strong>Idea clave:</strong> Cambiar entre <code>toast</code> y <code>banner</code> solo sustituye la fábrica concreta; el código cliente permanece igual porque programa contra <code>NotificationFactory</code>. Agregar una nueva familia (por ejemplo, <em>modal</em>) no rompe las existentes.
        </Callout.Text>
      </Callout.Root>
      <details className="rounded-lg border bg-white p-3 open:pb-3">
        <summary className="cursor-pointer select-none text-sm font-medium">
          Ver interfaces e implementaciones (notification-factory.tsx / toast-factory.tsx / banner-factory.tsx)
        </summary>
        <div className="mt-3 space-y-3">
          <CodeBlock code={interfaceCode} title="notification-factory.tsx" />
          <CodeBlock code={toastFactoryCode} title="toast-factory.tsx" />
          <CodeBlock code={bannerFactoryCode} title="banner-factory.tsx" />
        </div>
      </details>
    </div>
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
      <p className="text-sm text-gray-600">Interactúa cambiando <code>mode</code> y <code>variant</code>. La historia reutiliza la misma interfaz <code>NotificationFactory</code> para producir componentes distintos.</p>
      <div>{element}</div>
      {args.mode === 'toast' && (
        <p className="text-xs text-gray-500">Los toasts incluyen su propio <code>Provider</code> y desaparecen al cerrar.</p>
      )}
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



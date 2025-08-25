
"use client";

import type { Meta, StoryFn } from "@storybook/react";
import * as RadixToast from "@radix-ui/react-toast";

import { toastFactory } from "./toast-factory";
import { bannerFactory } from "./banner-factory";
// Si exportas Variant desde notification-factory, puedes importarlo. Aquí lo tipamos inline:
type Variant = "success" | "alert" | "informative" | "warning";
type Mode = "toast" | "banner";

import toastFactoryCode from "./toast-factory.tsx?raw";
import bannerFactoryCode from "./banner-factory.tsx?raw";
import interfaceCode from "./notification-factory.tsx?raw";
import { CodeBlock } from "../../../components/code-block";

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

type Args = {
  mode: Mode;
  variant: Variant;
  title?: string;
  description?: string;
};

// Función auxiliar para invocar el método correcto de la fábrica según la variante
function renderByVariant(
  mode: Mode,
  variant: Variant,
  props: { title?: string; description?: string }
) {
  const f = mode === "toast" ? toastFactory : bannerFactory;

  switch (variant) {
    case "success":
      return f.createSuccess(props);
    case "alert":
      return f.createAlert(props);
    case "informative":
      return f.createInformative(props);
    case "warning":
      return f.createWarning(props);
    default:
      return f.createInformative(props);
  }
}

const Template: StoryFn<Args> = (args) => {
  const element = renderByVariant(args.mode, args.variant, {
    title: args.title,
    description: args.description,
  });

  // Si el modo es toast, proveemos Provider + Viewport aquí (para no forzar a Banner a usarlo)
  if (args.mode === "toast") {
    return (
      <RadixToast.Provider swipeDirection="right">
        {element}
        <RadixToast.Viewport className="fixed top-5 right-5 flex flex-col gap-2 w-80 z-50 list-none pl-0" />
      </RadixToast.Provider>
    );
  }

  // Banner no necesita Provider
  return <div className="max-w-2xl">{element}</div>;
};

/** Story principal con controles */
export const Playground = Template.bind({});
Playground.args = {
  mode: "toast",
  variant: "success",
  title: "",
  description: "Operación completada exitosamente.",
};

/** Demostración de consistencia: misma variante en ambos productos */
export const SameFamilyBothProducts: StoryFn = () => {
  return (
    <div className="space-y-4">
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

      <h3 className="text-lg font-semibold">Misma familia (success) en Banner y Toast</h3>

      {/* Banner success */}
      <div className="max-w-2xl">
        {bannerFactory.createSuccess({
          description: "Perfil guardado correctamente.",
        })}
      </div>

      {/* Toast success */}
      <RadixToast.Provider swipeDirection="right">
        {toastFactory.createSuccess({
          description: "Perfil guardado correctamente (toast).",
        })}
        <RadixToast.Viewport className="fixed top-5 right-5 flex flex-col gap-2 w-80 z-50 list-none pl-0" />
      </RadixToast.Provider>
    </div>
  );
};
SameFamilyBothProducts.parameters = {
  docs: {
    description: {
      story:
        "La **Abstract Factory** garantiza coherencia visual entre productos (Banner/Toast) al compartir la misma familia de variantes.",
    },
  },
};

/** Variantes rápidas por modo para documentación */
export const AllVariantsBanner: StoryFn = () => (
  <div className="space-y-3 max-w-2xl">
    {bannerFactory.createSuccess({ description: "Operación exitosa." })}
    {bannerFactory.createAlert({ description: "Error al guardar cambios." })}
    {bannerFactory.createInformative({ description: "Nueva versión disponible." })}
    {bannerFactory.createWarning({ description: "Tu sesión expirará pronto." })}
  </div>
);

export const AllVariantsToast: StoryFn = () => (
  <RadixToast.Provider swipeDirection="right">
    <div className="space-y-2">
      {toastFactory.createSuccess({ description: "Operación exitosa." })}
      {toastFactory.createAlert({ description: "Error al guardar cambios." })}
      {toastFactory.createInformative({ description: "Nueva versión disponible." })}
      {toastFactory.createWarning({ description: "Tu sesión expirará pronto." })}
    </div>
    <RadixToast.Viewport className="fixed top-5 right-5 flex flex-col gap-2 w-80 z-50 list-none pl-0" />
  </RadixToast.Provider>
);

import type { Meta, StoryFn } from "@storybook/react"
import * as RadixToast from "@radix-ui/react-toast"
import { createToast } from "./factory"
import factoryCode from './factory.tsx?raw'
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from "../../../components/code-block";
import type { Variant } from "./factory";

export default {
  title: "Design Patterns/Creational/Factory Pattern",
  decorators: [
    (Story) => (
      <RadixToast.Provider swipeDirection="right">
        <Story />
        <RadixToast.Viewport
          className="fixed top-5 right-5 flex flex-col gap-2 w-80 z-50 list-none pl-0"
        />
      </RadixToast.Provider>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "alert", "informative", "warning"],
      table: { type: { summary: "string" }, defaultValue: { summary: "success" } }
    },
    description: {
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "Escribe descripcion aquí." } }
    },
  },
  parameters: {
    docs: {
      description: {
        component: "La Factory centraliza la creación de un producto (Toast) y encapsula variaciones visuales y semánticas en un único punto de mantenimiento."
      }
    }
  }
} as Meta

import { useState, useEffect } from 'react'

export const Implementation = () => {

  return (
    <Box className="space-y-8" p="3">
      {/* Header */}
      <Flex align="center" gap="3" className="flex-wrap">
        <h3 className="text-2xl font-semibold tracking-tight">Factory Pattern</h3>
        <Badge variant="soft" color="indigo">Creacional</Badge>
      </Flex>

      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        <strong>Factory</strong> es un patrón creacional que encapsula en un único punto la lógica necesaria para construir un tipo de producto con distintas variantes (colores, íconos, títulos, estilos). El objetivo es que el código cliente exprese intención ("quiero la variante X") sin repetir estructuras condicionales. Al centralizar la construcción, se facilita la evolución visual y se reduce el riesgo de inconsistencias.
      </p>

      <Separator size="4" />

      {/* General Problem & Solution */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            Sin una Factory, cada lugar que necesita una variante del mismo producto termina copiando y pegando estructuras: condicionales para decidir ícono o color, clases CSS repetidas y pequeños matices que con el tiempo divergen. Esto multiplica el esfuerzo al refactorizar (estilos, accesibilidad, métricas) y aumenta la probabilidad de inconsistencias visuales y semánticas.
          </p>
          <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-100/90">
            Además, la lógica de selección de variantes se dispersa, dificultando instrumentar analíticas (qué variantes se usan) o introducir nuevas sin buscar y editar múltiples archivos.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            Centralizar la construcción en una única función (o objeto) que recibe un discriminante (<code>variant</code>) y devuelve el producto completamente configurado. El cliente solo expresa intención; la fábrica decide estructura, ícono, estilos y título. Al existir un único punto de cambio se logra consistencia y se habilita añadir logging, validaciones o nuevas variantes sin propagar cambios.
          </p>
          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-100/90">
            El resultado: menos branching repetitivo, menor superficie para errores, tipado explícito de variantes y evolución guiada del componente sin fricción.
          </p>
        </div>
      </section>

      {/* Specific Case */}
      <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
        <header className="flex items-center gap-3 flex-wrap">
          <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Toast UI</h4>
          <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
        </header>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Problemática Específica</h5>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <li>Necesitamos toasts semánticos coherentes con ícono, color y título.</li>
            <li>El layout base es igual para cada variante.</li>
            <li>Riesgo de repetir markup + clases en cada uso directo.</li>
            <li>Queremos cambiar estilos/íconos en un solo lugar.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-3">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">La función <code>createToast(variant, description)</code> decide ícono, título y clases via <code>switch</code> (o un mapa). El consumidor solo pasa intención (<code>variant</code>) y mensaje. El resto queda encapsulado.</p>
        </div>

        {/* Snippets */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Implementación Concreta</h5>
          <CodeBlock code={factoryCode} title="factory.tsx" />
        </div>
      </section>
    </Box>
  )
}

export const Playground: StoryFn<{ variant: Variant; description: string }> = (args) => {
  const [open, setOpen] = useState(true)
  const [signature, setSignature] = useState('')

  const current = `${args.variant}::${args.description}`
  useEffect(() => {
    if (current !== signature) {
      setSignature(current)
      setOpen(true) 
    }
  }, [current, signature])

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/30 p-4 text-md leading-relaxed text-indigo-900 dark:text-indigo-200 shadow-sm">
        <h5 className="font-semibold mb-1 tracking-wide text-md uppercase">Cómo interactuar</h5>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Abre (si no está abierto) el panel <em>Controls</em> (icono arriba a la derecha).</li>
          <li>Cambia <code>variant</code> para ver cómo la Factory ajusta color, ícono y título.</li>
          <li>Edita <code>description</code> y observa actualización instantánea.</li>
        </ol>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-md border border-indigo-300 dark:border-indigo-700 bg-white/70 dark:bg-zinc-800 px-3 py-1.5 text-md font-medium text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-zinc-700 transition"
        >Reabrir Toast</button>
        {!open && (
          <span className="text-[11px] px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">Toast cerrado</span>
        )}
      </div>
      {/* Toast product (portal render via Provider viewport) */}
      {createToast(args.variant, args.description, { open, onOpenChange: setOpen })}
    </div>
  )
}
Playground.args = {
  variant: "success",
  description: "¡Operación completada exitosamente! Los datos se han guardado correctamente.",
}
Playground.parameters = {
  docs: {
    description: {
      story: "Interactúa cambiando la variante para ver cómo la Factory produce diferentes configuraciones sin duplicar JSX."
    }
  }
}





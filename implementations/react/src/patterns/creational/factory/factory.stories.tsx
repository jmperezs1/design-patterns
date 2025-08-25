import type { Meta, StoryFn } from "@storybook/react"
import * as RadixToast from "@radix-ui/react-toast"
import { createToast } from "./factory"
import factoryCode from './factory.tsx?raw'


export default {
  title: "Design Patterns/Creational/Factory Pattern",
  decorators: [
    (Story) => (
      <>
        <RadixToast.Provider swipeDirection="right">
          <Story />
            <RadixToast.Viewport
              className="fixed top-5 right-5 flex flex-col gap-2 w-80 z-50 list-none pl-0"
            ></RadixToast.Viewport>
        </RadixToast.Provider>
      </>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "alert", "informative", "warning"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "success" }
      }
    },
    description: { 
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Escribe descripcion aquí." }
      }
    },
  },
  
} as Meta

import type { Variant } from "./factory"
import { CodeBlock } from "../../../components/code-block"

const Template: StoryFn<{ variant: Variant; description: string }> = (args) => {
  return <>{createToast(args.variant, args.description)}</>
}

export const Implementation = () => {
  const notifications = [
    { variant: "success" as Variant, msg: "Archivo subido correctamente" },
    { variant: "warning" as Variant, msg: "Espacio de almacenamiento limitado" },
    { variant: "alert" as Variant, msg: "Error de conexión" },
    { variant: "informative" as Variant, msg: "Nuevas funciones disponibles" },
  ]

  return (
    <div className="space-y-4 w-[50%]">
      <h3 className="text-lg font-semibold mb-4">Factory Pattern</h3>
      <p className="text-sm text-gray-600 mb-4 text-justify">
        Este módulo demuestra el patrón de diseño <strong>Factory</strong> aplicado a la capa de presentación.
        La función <code>createToast(variant, description)</code> actúa como fábrica que construye y devuelve
        una notificación (JSX de <code>RadixToast</code>) completamente configurada. A partir del parámetro 
         <code>variant</code> (<code>success</code>, <code>alert</code>, <code>informative</code>,
        <code>warning</code>), la fábrica <em>encapsula</em> y <em>centraliza</em> todas las decisiones de creación
        —iconografía, paleta de colores, título por defecto y estructura— garantizando una interfaz
        única para el cliente y resultados visuales consistentes.
      </p>

      <details className="rounded-lg border bg-white/50 p-3 open:pb-3">
      <summary className="cursor-pointer select-none text-sm font-medium">
        Ver implementación (factory.tsx)
      </summary>
      <div className="mt-3">
        <CodeBlock code={factoryCode} title="factory.tsx" />
      </div>
    </details>

      {notifications.map((notification, index) => (
        <div key={index} className="mb-2">
          {createToast(notification.variant, notification.msg)}
        </div>
      ))}
    </div>
  )
}


export const Playground = Template.bind({})
Playground.args = {
  variant: "success",
  description: "¡Operación completada exitosamente! Los datos se han guardado correctamente.",
}
Playground.parameters = {
  docs: {
    description: {
      story: "Success variant created by the factory with green styling and CheckCircle icon."
    }
  }
}





"use client"

import * as RadixToast from "@radix-ui/react-toast"
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"

/**
 * Variantes admitidas para la creación de notificaciones tipo Toast.
 */
export type Variant = "success" | "alert" | "informative" | "warning"


/**
 * Opciones de configuración para `createToast`.
 * - `open`: controla si el toast está visible inicialmente (por defecto `true`).
 * - `onOpenChange`: callback para controlar cambios en el estado de apertura.
 */
interface CreateToastOptions {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Fábrica (Factory) para crear un componente Toast listo para renderizar.
 *
 * Selecciona icono, estilos y título en función de la variante indicada y
 * devuelve un `RadixToast.Root` configurado. El resultado puede incrustarse en
 * cualquier parte de la UI, preferentemente dentro de un `RadixToast.Provider`.
 *
 * Ejemplo de uso:
 * ```tsx
 * const toast = createToast("success", "Cambios guardados correctamente");
 * // Renderizar dentro del contenedor de toasts
 * <RadixToast.Provider>{toast}</RadixToast.Provider>
 * ```
 */
export function createToast(
  variant: Variant,
  description: string,
  options: CreateToastOptions = {}
) {
  let IconComponent: React.ComponentType<{ className?: string }>
  let bgClass: string
  let title: string
  switch (variant) {
    case "success":
      IconComponent = CheckCircle
      bgClass = "bg-green-100 text-green-800"
      title = "Success"
      break
    case "alert":
      IconComponent = XCircle
      bgClass = "bg-red-100 text-red-800"
      title = "Alert"
      break
    case "informative":
      IconComponent = Info
      bgClass = "bg-blue-100 text-blue-800"
      title = "Information"
      break
    case "warning":
      IconComponent = AlertTriangle
      bgClass = "bg-yellow-100 text-yellow-800"
      title = "Warning"
      break
    default:
      IconComponent = Info
      bgClass = "bg-gray-100 text-gray-800"
      title = "Notification"
  }
  const { open = true, onOpenChange } = options

  return (
    <RadixToast.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={600000}
      className={`p-4 rounded shadow-sm border border-black/5 dark:border-white/10 ${bgClass} flex items-start gap-3 text-sm relative`}
    >
      <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 pr-4">
        <RadixToast.Title className="font-semibold block text-sm">{title}</RadixToast.Title>
        {description && (
          <RadixToast.Description className="mt-1 leading-snug">
            {description}
          </RadixToast.Description>
        )}
      </div>
      <RadixToast.Close
        aria-label="Cerrar"
        className="absolute top-1.5 right-1.5 text-[10px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded bg-white/40 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition"
      >
        Cerrar
      </RadixToast.Close>
    </RadixToast.Root>
  )
}

"use client";

import type { ToastProps } from "./interfaces/toast";
import { renderToast } from "./components/toast";
import type { NotificationFactory } from "./notification-factory";

/**
 * Fábrica concreta para producir componentes de notificación tipo "Toast".
 *
 * Implementa `NotificationFactory<ToastProps>` delegando en `renderToast` y
 * proporcionando métodos específicos por variante.
 *
 * Ejemplo de uso:
 * ```tsx
 * const toast = toastFactory.createWarning({ message: "Espacio casi lleno" });
 * ```
 */
export const toastFactory: NotificationFactory<ToastProps> = {
  /** Crea un toast de tipo éxito. */
  createSuccess: (p) => renderToast("success", p),
  /** Crea un toast de tipo alerta. */
  createAlert: (p) => renderToast("alert", p),
  /** Crea un toast de tipo informativo. */
  createInformative: (p) => renderToast("informative", p),
  /** Crea un toast de tipo advertencia. */
  createWarning: (p) => renderToast("warning", p),
};

"use client";

import type { BannerProps } from "./interfaces/banner";
import { renderBanner } from "./components/banner";
import type { NotificationFactory } from "./notification-factory";

/**
 * Fábrica concreta para producir componentes de notificación tipo "Banner".
 *
 * Implementa la interfaz genérica `NotificationFactory<BannerProps>` y delega
 * el renderizado en la función `renderBanner`, pasando el tipo de notificación
 * correspondiente. Cada método retorna un `JSX.Element` listo para usar.
 *
 * Ejemplo de uso:
 * ```tsx
 * const banner = bannerFactory.createSuccess({ title: "Guardado", description: "Los cambios se aplicaron" });
 * ```
 */
export const bannerFactory: NotificationFactory<BannerProps> = {
  /** Crea un banner de tipo éxito. */
  createSuccess: (p) => renderBanner("success", p),
  /** Crea un banner de tipo alerta. */
  createAlert: (p) => renderBanner("alert", p),
  /** Crea un banner de tipo informativo. */
  createInformative: (p) => renderBanner("informative", p),
  /** Crea un banner de tipo advertencia. */
  createWarning: (p) => renderBanner("warning", p),
};

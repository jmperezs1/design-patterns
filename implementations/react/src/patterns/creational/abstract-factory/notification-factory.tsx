import type { JSX } from "react";

/**
 * Interfaz que define una fábrica abstracta para crear componentes de notificación.
 * 
 */
export interface NotificationFactory<TProps> {
  /**
   * Crea un componente de notificación de éxito.
   * 
   */
  createSuccess: (props: TProps) => JSX.Element;
  
  /**
   * Crea un componente de notificación de alerta.
   * 
   */
  createAlert: (props: TProps) => JSX.Element;
  
  /**
   * Crea un componente de notificación informativa.
   * 
   */
  createInformative: (props: TProps) => JSX.Element;
  
  /**
   * Crea un componente de notificación de advertencia.
   * 
   */
  createWarning: (props: TProps) => JSX.Element;
}
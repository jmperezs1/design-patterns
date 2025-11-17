import type { CardBuilder } from './builder';
import type { ReactNode } from 'react';

/**
 * Director que orquesta los pasos de construcción de una tarjeta.
 *
 * Aplica el patrón Builder delegando en un `CardBuilder` concreto según las
 * opciones proporcionadas. Sólo invoca los métodos del builder cuando la opción
 * correspondiente existe, y finalmente retorna el producto construido.
 */
export class CardDirector {
  /**
   * Construye una tarjeta a partir de las opciones dadas, usando el builder.
   * @param builder Implementación concreta de `CardBuilder`.
   * @param opts Opciones de construcción (propiedades opcionales de la tarjeta).
   * @returns El `CardProduct` resultante de la construcción.
   */
  construct(
    builder: CardBuilder,
    opts: {
      title?: string;
      subtitle?: string;
      mediaUrl?: string;
      body?: ReactNode;
      footer?: ReactNode;
    }
  ) {
    if (opts.title) builder.setTitle(opts.title);
    if (opts.subtitle) builder.setSubtitle(opts.subtitle);
    if (opts.mediaUrl) builder.setMedia(opts.mediaUrl);
    if (opts.body) builder.setBody(opts.body);
    if (opts.footer) builder.setFooter(opts.footer);
    return builder.build();
  }
}
import type { CardProduct } from "./product-card";

/**
 * Interfaz que define los métodos para construir las diferentes partes de una tarjeta.
 */

export interface CardBuilder {
    /** Establece el título de la tarjeta. */
    setTitle(title: string): this;

    /** Establece el subtítulo de la tarjeta. */
    setSubtitle(subtitle: string): this;

    /** Establece la URL del medio (imagen, video, etc.) de la tarjeta. */
    setMedia(url: string): this;

    /** Establece el contenido principal de la tarjeta. */
    setBody(content: React.ReactNode): this;

    /** Establece el contenido del pie de la tarjeta. */
    setFooter(content: React.ReactNode): this;
    
    /** Construye y retorna el producto tarjeta completo. */
    build(): CardProduct;
}
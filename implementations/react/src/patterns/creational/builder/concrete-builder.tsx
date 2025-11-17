import type { CardBuilder } from "./builder";
import type { CardProduct } from "./product-card";

/**
 * Implementación concreta del constructor de tarjetas.
 *
 * Sigue el contrato de `CardBuilder` y aplica un enfoque fluido (métodos que devuelven `this`).
 * Mantiene un estado interno del producto en construcción y, al invocar `build()`,
 * retorna una copia del resultado para evitar mutaciones externas accidentales.
 */

export class CardConcreteBuilder implements CardBuilder {
    private product: CardProduct;

    constructor() {
        this.product = {};
    }

    /** Establece el título de la tarjeta y retorna el builder. */
    setTitle(title: string) {
        this.product.title = title;
        return this;
    }
    /** Establece el subtítulo de la tarjeta y retorna el builder. */
    setSubtitle(subtitle: string) {
        this.product.subtitle = subtitle;
        return this;
    }
    /** Establece la URL del medio de la tarjeta y retorna el builder. */
    setMedia(url: string) {
        this.product.mediaUrl = url;
        return this;
    }
    /** Establece el contenido principal de la tarjeta y retorna el builder. */
    setBody(content: React.ReactNode) {
        this.product.body = content;
        return this;
    }

    /** Establece el pie de la tarjeta y retorna el builder. */
    setFooter(content: React.ReactNode) {
        this.product.footer = content;
        return this;
    }

    /**
     * Finaliza la construcción y devuelve el producto.
     */
    build(): CardProduct {
        return { ...this.product };
    }
}
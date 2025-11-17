import type { EmailTemplate } from "./interfaces/email-template";
import type { Prototype } from "./prototype";

/**
 * Implementación concreta del patrón Prototype para `EmailTemplate`.
 *
 * Mantiene una plantilla base inmutable dentro de la instancia y proporciona:
 * - `clone(overrides)`: crea un nuevo prototipo a partir de una copia segura de la base,
 *    aplicando overrides y combinando el objeto anidado `layout`.
 * - `get()`: devuelve una copia del `EmailTemplate` actual sin compartir referencias
 *    mutables (se copian `layout` y `tags`).
 *
 */
export class EmailTemplatePrototype implements Prototype<EmailTemplate> {
    private base: EmailTemplate;
    
    constructor(base: EmailTemplate) {
        this.base = base;
    }

    /**
     * Crea un nuevo prototipo basado en la plantilla actual aplicando overrides.
     * Copia `layout` y `tags` para evitar referencias compartidas y combina
     * `layout` con los valores proporcionados en overrides.
     * @param overrides Cambios parciales a aplicar sobre la base.
     * @returns Un nuevo `Prototype<EmailTemplate>` con el estado actualizado.
     */
    clone(overrides: Partial<EmailTemplate> = {}): Prototype<EmailTemplate> {
        const copy: EmailTemplate = {
            ...this.base,
            layout: this.base.layout ? { ...this.base.layout } : undefined,
            tags: this.base.tags ? [...this.base.tags] : undefined,
        };

        const next: EmailTemplate = {
            ...copy,
            ...overrides,
            layout: { ...(copy.layout || {}), ...(overrides.layout || {}) },
        };
        return new EmailTemplatePrototype(next);
    }
    
    /**
     * Obtiene el `EmailTemplate` actual como una copia segura (sin aliasing),
     * duplicando `layout` y `tags` cuando existan.
     */
    get(): EmailTemplate {
        return {
        ...this.base,
        layout: this.base.layout ? { ...this.base.layout } : undefined,
        tags: this.base.tags ? [...this.base.tags] : undefined,
        };
    }

}
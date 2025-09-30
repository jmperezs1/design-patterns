import type { EmailTemplate } from "./interfaces/email-template";
import type { Prototype } from "./prototype";

export class EmailTemplatePrototype implements Prototype<EmailTemplate> {
    private base: EmailTemplate;
    
    constructor(base: EmailTemplate) {
        this.base = base;
    }

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
    
    get(): EmailTemplate {
        return {
        ...this.base,
        layout: this.base.layout ? { ...this.base.layout } : undefined,
        tags: this.base.tags ? [...this.base.tags] : undefined,
        };
    }

}
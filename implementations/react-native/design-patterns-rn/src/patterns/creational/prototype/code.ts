import type { CodeSnippet } from '../../../registry/types';

export const prototypeCodeSnippets: CodeSnippet[] = [
  { title: 'prototype.ts', language: 'ts', code: `export interface Prototype<T> {
  clone(overrides?: Partial<T>): Prototype<T>;
  get(): T;
}` },
  { title: 'concrete-prototype.ts', language: 'ts', code: `export class EmailTemplatePrototype implements Prototype<EmailTemplate> {
  private base: EmailTemplate;
  constructor(base: EmailTemplate) { this.base = base; }

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
}` },
  { title: 'interfaces/email-template.ts', language: 'ts', code: `export type EmailTemplate = {
  from: string;
  subject: string;
  bodyHtml: string;
  layout?: {
    headerHtml?: string;
    footerHtml?: string;
    brandColor?: string;
  };
  tags?: string[];
};
` },
];

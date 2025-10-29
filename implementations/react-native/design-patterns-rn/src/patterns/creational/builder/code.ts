import type { CodeSnippet } from '../../../registry/types';

export const builderCodeSnippets: CodeSnippet[] = [
  { title: 'builder.ts', language: 'ts', code: `export interface CardBuilder {
  setTitle(title: string): this;
  setSubtitle(subtitle: string): this;
  setMedia(url: string): this;
  setBody(content: React.ReactNode): this;
  setFooter(content: React.ReactNode): this;
  build(): CardProduct;
}` },
  { title: 'concrete-builder.tsx', language: 'tsx', code: `export class CardConcreteBuilder implements CardBuilder {
  private product: CardProduct = {};

  setTitle(title: string) { this.product.title = title; return this; }
  setSubtitle(subtitle: string) { this.product.subtitle = subtitle; return this; }
  setMedia(url: string) { this.product.mediaUrl = url; return this; }
  setBody(content: React.ReactNode) { this.product.body = content; return this; }
  setFooter(content: React.ReactNode) { this.product.footer = content; return this; }
  build(): CardProduct { return { ...this.product }; }
}` },
  { title: 'director.ts', language: 'ts', code: `export class CardDirector {
  construct(
    builder: CardBuilder,
    opts: { title?: string; subtitle?: string; mediaUrl?: string; body?: React.ReactNode; footer?: React.ReactNode }
  ) {
    if (opts.title) builder.setTitle(opts.title);
    if (opts.subtitle) builder.setSubtitle(opts.subtitle);
    if (opts.mediaUrl) builder.setMedia(opts.mediaUrl);
    if (opts.body) builder.setBody(opts.body);
    if (opts.footer) builder.setFooter(opts.footer);
    return builder.build();
  }
}` },
];

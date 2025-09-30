import type { Meta, StoryFn } from '@storybook/react';

import { Card } from './product-card';
import { CardDirector } from './director';
import { CardConcreteBuilder } from './concrete-builder';
import { CodeBlock } from '../../../components/code-block';

// raw sources
// Vite `?raw` loader to show code
// If your bundler differs, adjust import accordingly
import builderCode from './builder.tsx?raw';
import concreteBuilderCode from './concrete-builder.tsx?raw';
import directorCode from './director.tsx?raw';
import productCardCode from './product-card.tsx?raw';

export default {
  title: 'Design Patterns/Creational/Builder Pattern',
  argTypes: {
    title: { control: 'text', table: { type: { summary: 'string' } } },
    subtitle: { control: 'text', table: { type: { summary: 'string' } } },
    mediaUrl: { control: 'text', table: { type: { summary: 'string' } } },
    body: { control: 'text', table: { type: { summary: 'ReactNode | string' } } },
    footer: { control: 'text', table: { type: { summary: 'ReactNode | string' } } },
  },
} as Meta;

type Args = {
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  body?: string;
  footer?: string;
};

const Template: StoryFn<Args> = () => {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-semibold mb-4">Builder Pattern</h3>
      <p className="text-sm text-gray-600 mb-4 text-justify">
        Este módulo demuestra el patrón de diseño <strong>Builder</strong> para construir un objeto complejo
        paso a paso. El <code>Director</code> orquesta las llamadas al <code>Builder</code> para producir un
        <code>CardProduct</code> consistente y reusable. La implementación soporta encadenamiento (<em>fluent API</em>)
        y reinicio del estado del builder tras <code>build()</code> para reuso seguro.
      </p>

      {/* Código de ejemplo */}
      <details className="rounded-lg border bg-white/50 p-3 open:pb-3">
        <summary className="cursor-pointer select-none text-sm font-medium">Código de ejemplo:</summary>
        <div className="mt-3 space-y-3">
          <CodeBlock code={builderCode} title="builder.tsx" />
          <CodeBlock code={concreteBuilderCode} title="concrete-builder.tsx" />
          <CodeBlock code={directorCode} title="director.tsx" />
          <CodeBlock code={productCardCode} title="product-card.tsx" />
        </div>
      </details>
    </div>
  );
};

export const Implementation = Template.bind({});

export const Playground = (args: Args) => {
    const director = new CardDirector();
    const builder = new CardConcreteBuilder();
    const product = director.construct(builder, {
        title: args.title,
        subtitle: args.subtitle,
        mediaUrl: args.mediaUrl,
        body: args.body ? <p>{args.body}</p> : undefined,
        footer: args.footer ? <button>{args.footer}</button> : undefined,
    });

    return (
        <div className="space-y-4 w-full">
            <h3 className="text-lg font-semibold mb-4">Builder Pattern</h3>
            <div className="rounded-lg border bg-white/50 p-3">
                <Card {...product} />
            </div>
        </div>
    );
};
Playground.args = {
    title: 'MacBook Pro 14"',
    subtitle: 'M3 Pro',
    mediaUrl:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    body: 'Pantalla Liquid Retina XDR y batería de larga duración.',
    footer: 'Comprar',
};
Playground.parameters = {
    docs: {
        description: {
            story:
                'Interactúa con los controles para construir diferentes variantes del Card usando el Builder.',
        },
    },
};

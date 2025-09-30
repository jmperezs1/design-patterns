// EmailPrototype.stories.tsx
import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import type { EmailTemplate } from './interfaces/email-template';
import { EmailTemplatePrototype } from './concrete-prototype';

import { CodeBlock } from '../../../components/code-block';

// ----- raw source imports (Vite ?raw) -----
import prototypeCode from './prototype.ts?raw';
import concretePrototypeCode from './concrete-prototype.tsx?raw';

export default {
  title: 'Design Patterns/Creational/Prototype Pattern',
  argTypes: {
    templateName: {
      control: { type: 'select' },
      options: ['welcome', 'reset_password', 'newsletter'],
      table: { type: { summary: '"welcome" | "reset_password" | "newsletter"' } },
    },
    from: { control: 'text', table: { type: { summary: 'string (override)' } } },
    subject: { control: 'text', table: { type: { summary: 'string (override)' } } },
    brandColor: { control: 'color', table: { type: { summary: 'string (hex)' } } },
    headerHtml: { control: 'text', table: { type: { summary: 'string (override)' } } },
    bodyHtml: { control: 'text', table: { type: { summary: 'string (override)' } } },
    footerHtml: { control: 'text', table: { type: { summary: 'string (override)' } } },
    tokensText: { control: 'text', table: { type: { summary: 'key=value per line' } } },
  },
} as Meta;

// ---------------- helpers (local al story) ----------------
function pathGet(obj: any, path: string) {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}
function interpolate(tpl: string, ctx: Record<string, any>) {
  return tpl.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
    const val = pathGet(ctx, key);
    return val == null ? '' : String(val);
  });
}
function renderEmail(tpl: EmailTemplate, data: Record<string, any>) {
  const ctx = { ...data, brand: tpl.layout?.brandColor }; // expone {{brand}}
  const header = tpl.layout?.headerHtml ? interpolate(tpl.layout.headerHtml, ctx) : '';
  const body = interpolate(tpl.bodyHtml, ctx);
  const footer = tpl.layout?.footerHtml ? interpolate(tpl.layout.footerHtml, ctx) : '';
  return {
    from: interpolate(tpl.from, ctx),
    subject: interpolate(tpl.subject, ctx),
    html: `${header}${body}${footer}`,
  };
}
// ---------------- prototipos base (cliente los crea una vez) ----------------
function makePrototypes() {
  const welcome = new EmailTemplatePrototype({
    from: 'noreply@acme.com',
    subject: 'Welcome to {{app_name}}, {{first_name}}!',
    bodyHtml: `
      <div style="padding:16px">
        <p>Hi {{first_name}},</p>
        <p>Thanks for joining <b>{{app_name}}</b>! We're thrilled to have you.</p>
        <p>Get started by exploring your dashboard.</p>
      </div>
    `,
    layout: {
      brandColor: '#2563eb',
      headerHtml: `
        <div style="background: {{brand}}; color: white; padding: 14px; border-radius: 10px 10px 0 0;">
          <strong>{{app_name}}</strong>
        </div>
      `,
      footerHtml: `
        <hr/>
        <p style="color:#6b7280; font-size:12px">— The {{app_name}} Team</p>
      `,
    },
    tags: ['welcome', 'onboarding'],
  } as EmailTemplate);

  const reset = new EmailTemplatePrototype({
    from: 'security@acme.com',
    subject: 'Reset your {{app_name}} password',
    bodyHtml: `
      <div style="padding:16px">
        <p>We received a request to reset your password.</p>
        <p><a href="{{reset_link}}">Click here to reset</a>. This link expires in {{ttl_minutes}} minutes.</p>
      </div>
    `,
    layout: {
      brandColor: '#475569',
      headerHtml: `
        <div style="background: {{brand}}; color: white; padding: 14px; border-radius: 10px 10px 0 0;">
          <strong>{{app_name}} • Security</strong>
        </div>
      `,
      footerHtml: `
        <hr/>
        <p style="color:#6b7280; font-size:12px">If you didn’t request this, you can ignore this email.</p>
      `,
    },
    tags: ['security', 'password-reset'],
  } as EmailTemplate);

  const newsletter = new EmailTemplatePrototype({
    from: 'news@acme.com',
    subject: '{{app_name}} Weekly — Issue #{{issue}}',
    bodyHtml: `
      <div style="padding:16px">
        <h2 style="margin:0 0 8px 0">{{headline}}</h2>
        <p>{{summary}}</p>
        <p><a href="{{cta_url}}">{{cta_label}}</a></p>
      </div>
    `,
    layout: {
      brandColor: '#16a34a',
      headerHtml: `
        <div style="background: {{brand}}; color: white; padding: 14px; border-radius: 10px 10px 0 0;">
          <strong>{{app_name}} Newsletter</strong>
        </div>
      `,
      footerHtml: `
        <hr/>
        <p style="color:#6b7280; font-size:12px">You’re receiving this because you subscribed to {{app_name}} updates.</p>
      `,
    },
    tags: ['newsletter'],
  } as EmailTemplate);

  return { welcome, reset_password: reset, newsletter };
}

// ---------------- Docs/Implementation ----------------
const Template: StoryFn = () => {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-semibold mb-2">Prototype Pattern — Email Templates</h3>
      <p className="text-sm text-gray-600 mb-4 text-justify">
        En Prototype no ensamblas paso a paso: tomas un <em>prototipo</em> listo y lo <b>clonas</b> con
        overrides mínimos. Así heredas defaults consistentes y creas variaciones rápido.
      </p>

      <details className="rounded-lg border bg-white/50 p-3 open:pb-3">
        <summary className="cursor-pointer select-none text-sm font-medium">Código de ejemplo:</summary>
        <div className="mt-3 space-y-3">
          <CodeBlock code={prototypeCode} title="prototype.ts" />
          <CodeBlock code={concretePrototypeCode} title="concrete-prototype.ts" />
        </div>
      </details>
    </div>
  );
};
export const Implementation = Template.bind({});

// ---------------- NUEVO: Interactive Lab (más interactivo) ----------------
export const Playground: StoryFn = () => {
  // Registro mutable de prototipos para "forkear" bases
  const [registry, setRegistry] = React.useState(makePrototypes());
  type Key = keyof typeof registry;

  // selección y overrides locales
  const [selected, setSelected] = React.useState<Key>('welcome');
  const [from, setFrom] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [brandColor, setBrandColor] = React.useState('#2563eb');
  const [headerHtml, setHeaderHtml] = React.useState('');
  const [bodyHtml, setBodyHtml] = React.useState('');
  const [footerHtml, setFooterHtml] = React.useState('');
  const [tokensText, setTokensText] = React.useState(
    [
      'first_name=Ana',
      'app_name=FailFast',
      'reset_link=https://app.example.com/reset?token=XYZ',
      'ttl_minutes=30',
      'headline=Shiny new features',
      'summary=We’ve shipped improvements to performance and stability.',
      'issue=42',
      'cta_label=Read more',
      'cta_url=https://blog.example.com/issue-42',
    ].join('\n')
  );

  // “Outbox” de emails renderizados
  const [outbox, setOutbox] = React.useState<Array<{ from: string; subject: string; html: string }>>([]);

  // sincroniza color base al cambiar plantilla
  React.useEffect(() => {
    const base = registry[selected].get();
    setBrandColor(base.layout?.brandColor ?? '#2563eb');
  }, [selected, registry]);

  const parseTokens = React.useCallback((text: string) => {
    const ctx: Record<string, any> = {};
    for (const raw of text.split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const k = line.slice(0, eq).trim();
      const v = line.slice(eq + 1).trim();
      ctx[k] = v;
    }
    return ctx;
  }, []);

  // arma overrides sólo con lo que se llenó
  const overrides: Partial<EmailTemplate> = React.useMemo(() => {
    const o: Partial<EmailTemplate> = {};
    if (from.trim()) o.from = from;
    if (subject.trim()) o.subject = subject;
    if (bodyHtml.trim()) o.bodyHtml = bodyHtml;
    const layout: EmailTemplate['layout'] = {};
    if (brandColor.trim()) layout.brandColor = brandColor;
    if (headerHtml.trim()) layout.headerHtml = headerHtml;
    if (footerHtml.trim()) layout.footerHtml = footerHtml;
    if (Object.keys(layout).length) o.layout = layout;
    return o;
  }, [from, subject, bodyHtml, brandColor, headerHtml, footerHtml]);

  // preview (clonar + materializar + render)
  const preview = React.useMemo(() => {
    const tpl = registry[selected].clone(overrides).get();
    return renderEmail(tpl, parseTokens(tokensText));
  }, [registry, selected, overrides, tokensText, parseTokens]);

  // acciones interactivas
  const addToOutbox = () => setOutbox((prev) => [...prev, preview]);
  const clearOverrides = () => {
    setFrom(''); setSubject(''); setBodyHtml(''); setHeaderHtml(''); setFooterHtml('');
  };
  const loadBaseIntoOverrides = () => {
    const base = registry[selected].get();
    setFrom(base.from);
    setSubject(base.subject);
    setBodyHtml(base.bodyHtml);
    setHeaderHtml(base.layout?.headerHtml ?? '');
    setFooterHtml(base.layout?.footerHtml ?? '');
    setBrandColor(base.layout?.brandColor ?? brandColor);
  };
  // *** Lo interactivo: “forkear” el prototipo base con los overrides actuales
  const forkPrototype = () => {
    const newProto = registry[selected].clone(overrides) as EmailTemplatePrototype;
    setRegistry((prev) => ({ ...prev, [selected]: newProto }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 w-full">
      {/* Panel de control */}
      <div className="rounded-lg border bg-white/50 p-3 space-y-2">
        <h3 className="text-lg font-semibold">Interactive Lab</h3>

        <label className="text-xs text-gray-600">Template</label>
        <select
          className="w-full border rounded-md p-2"
          value={selected}
          onChange={(e) => setSelected(e.target.value as Key)}
        >
          {Object.keys(registry).map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <button className="border rounded-md px-2 py-1" onClick={loadBaseIntoOverrides}>Cargar base → overrides</button>
          <button className="border rounded-md px-2 py-1" onClick={clearOverrides}>Limpiar overrides</button>
        </div>

        <hr className="my-2" />

        <label className="text-xs text-gray-600">From (override)</label>
        <input className="w-full border rounded-md p-2" value={from} onChange={(e) => setFrom(e.target.value)} />

        <label className="text-xs text-gray-600">Subject (override)</label>
        <input className="w-full border rounded-md p-2" value={subject} onChange={(e) => setSubject(e.target.value)} />

        <label className="text-xs text-gray-600">Brand Color (&#123;&#123;brand&#125;&#125;)</label>
        <input className="w-full border rounded-md p-1 h-10" type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} />

        <label className="text-xs text-gray-600">Header HTML (override)</label>
        <textarea className="w-full border rounded-md p-2" rows={3} value={headerHtml} onChange={(e) => setHeaderHtml(e.target.value)} />

        <label className="text-xs text-gray-600">Body HTML (override)</label>
        <textarea className="w-full border rounded-md p-2" rows={6} value={bodyHtml} onChange={(e) => setBodyHtml(e.target.value)} />

        <label className="text-xs text-gray-600">Footer HTML (override)</label>
        <textarea className="w-full border rounded-md p-2" rows={3} value={footerHtml} onChange={(e) => setFooterHtml(e.target.value)} />

        <hr className="my-2" />

        <label className="text-xs text-gray-600">Tokens (key=value per line)</label>
        <textarea
          className="w-full border rounded-md p-2"
          rows={8}
          value={tokensText}
          onChange={(e) => setTokensText(e.target.value)}
        />

        <div className="flex flex-wrap gap-2 pt-1">
          <button className="border rounded-md px-3 py-1" onClick={addToOutbox}>Clonar & añadir a Outbox</button>
          <button className="border rounded-md px-3 py-1" onClick={forkPrototype}>Fork del prototipo (persistir cambios)</button>
        </div>

        <p className="text-xs text-gray-600 pt-1">
          <b>Clone</b>: crea una instancia con overrides (no modifica el prototipo base).<br />
          <b>Fork</b>: clona y <i>reemplaza</i> el prototipo base con los overrides → los cambios quedan como nuevos defaults.
        </p>
      </div>

      {/* Vista derecha: Preview + Outbox */}
      <div className="space-y-4">
        <section>
          <div className="font-semibold mb-2">Live Preview</div>
          <div className="rounded-lg border bg-white/50 overflow-hidden">
            <div className="p-3 border-b bg-gray-50">
              <div className="text-xs text-gray-500">From</div>
              <div className="font-semibold">{preview.from}</div>
              <div className="text-xs text-gray-500 mt-2">Subject</div>
              <div>{preview.subject}</div>
            </div>
            <div className="p-0">
              {/* En producción, sanitiza HTML o usa contenido confiable */}
              <div dangerouslySetInnerHTML={{ __html: preview.html }} />
            </div>
          </div>
        </section>

        <section>
          <div className="font-semibold mb-2">Outbox (clones renderizados)</div>
          {outbox.length === 0 ? (
            <div className="text-sm text-gray-500">Aún no hay clones. Usa “Clonar & añadir”.</div>
          ) : (
            <div className="grid gap-3">
              {outbox.map((em, i) => (
                <div key={i} className="rounded-lg border bg-white/50 overflow-hidden">
                  <div className="p-3 border-b bg-gray-50">
                    <div className="text-xs text-gray-500">From</div>
                    <div className="font-semibold">{em.from}</div>
                    <div className="text-xs text-gray-500 mt-2">Subject</div>
                    <div>{em.subject}</div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: em.html }} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

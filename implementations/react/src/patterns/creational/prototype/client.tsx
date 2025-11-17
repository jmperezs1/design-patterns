"use client";

import React from "react";
import type { EmailTemplate } from "./interfaces/email-template";
import type { Prototype } from "./prototype";
import { EmailTemplatePrototype } from "./concrete-prototype";
import { renderEmail } from "./helpers/helpers";

const TEMPLATE_KEYS = ["welcome", "reset_password", "newsletter"] as const;
type TemplateKey = (typeof TEMPLATE_KEYS)[number];

/**
 * Estudio interactivo para el patrón Prototype aplicado a plantillas de email.
 *
 * Define tres prototipos base (welcome, reset_password, newsletter) y permite
 * generar clones con overrides de campos (incluido `layout`). La vista previa
 * se renderiza a partir del clon y de un contexto de tokens clave=valor.
 * También mantiene un "Outbox" con clones renderizados.
 */
export default function EmailTemplateStudio() {
  /**
   * Mapa de prototipos tipados por clave. Cada valor implementa `Prototype<EmailTemplate>`
   * y oculta la implementación concreta (`EmailTemplatePrototype`).
   */
  const templates = React.useMemo<Record<TemplateKey, Prototype<EmailTemplate>>>(() => {
    const welcome: Prototype<EmailTemplate> = new EmailTemplatePrototype({
      from: "noreply@acme.com",
      subject: "¡Bienvenido(a) a {{app_name}}, {{first_name}}!",
      bodyHtml: `
        <div style="padding:16px">
          <p>Hola {{first_name}},</p>
          <p>¡Gracias por unirte a <b>{{app_name}}</b>! Nos alegra tenerte aquí.</p>
          <p>Comienza explorando tu panel de control.</p>
        </div>
      `,
      layout: {
        brandColor: "#2563eb",
        headerHtml: `<div style="background: {{brand}}; color: #fff; padding: 14px; border-radius: 10px 10px 0 0;"><strong>{{app_name}}</strong></div>`,
        footerHtml: `<hr/><p style=\"color:#6b7280; font-size:12px\">— El equipo de {{app_name}}</p>`,
      },
      tags: ["welcome", "onboarding"],
    });

    const reset_password: Prototype<EmailTemplate> = new EmailTemplatePrototype({
      from: "security@acme.com",
      subject: "Restablece tu contraseña de {{app_name}}",
      bodyHtml: `
        <div style="padding:16px">
          <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
          <p><a href="{{reset_link}}">Haz clic aquí para restablecerla</a>. Este enlace expira en {{ttl_minutes}} minutos.</p>
        </div>
      `,
      layout: {
        brandColor: "#475569",
        headerHtml: `<div style="background: {{brand}}; color: #fff; padding: 14px; border-radius: 10px 10px 0 0;"><strong>{{app_name}} • Seguridad</strong></div>`,
        footerHtml: `<hr/><p style=\"color:#6b7280; font-size:12px\">Si no solicitaste esto, puedes ignorar este correo.</p>`,
      },
      tags: ["security", "password-reset"],
    });

    const newsletter: Prototype<EmailTemplate> = new EmailTemplatePrototype({
      from: "news@acme.com",
      subject: "{{app_name}} Semanal — Edición #{{issue}}",
      bodyHtml: `
        <div style="padding:16px">
          <h2 style="margin:0 0 8px 0">{{headline}}</h2>
          <p>{{summary}}</p>
          <p><a href="{{cta_url}}">{{cta_label}}</a></p>
        </div>
      `,
      layout: {
        brandColor: "#16a34a",
        headerHtml: `<div style="background: {{brand}}; color: #fff; padding: 14px; border-radius: 10px 10px 0 0;"><strong>{{app_name}} Boletín</strong></div>`,
        footerHtml: `<hr/><p style=\"color:#6b7280; font-size:12px\">Recibes este correo porque te suscribiste a las novedades de {{app_name}}.</p>`,
      },
      tags: ["newsletter"],
    });

    return { welcome, reset_password, newsletter };
  }, []);

  // ---------- Estado UI
  const [selected, setSelected] = React.useState<TemplateKey>("welcome");
  const [from, setFrom] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [brandColor, setBrandColor] = React.useState("#2563eb");
  const [headerHtml, setHeaderHtml] = React.useState("");
  const [bodyHtml, setBodyHtml] = React.useState("");
  const [footerHtml, setFooterHtml] = React.useState("");
  const [tokensText, setTokensText] = React.useState(
    [
      "first_name=Ana",
      "app_name=FailFast",
      "reset_link=https://app.example.com/reset?token=XYZ",
      "ttl_minutes=30",
      "headline=Novedades destacadas",
      "summary=Hemos publicado mejoras de rendimiento y estabilidad.",
      "issue=42",
      "cta_label=Leer más",
      "cta_url=https://blog.example.com/issue-42",
    ].join("\n")
  );
  const [outbox, setOutbox] = React.useState<Array<{ from: string; subject: string; html: string }>>([]);

  React.useEffect(() => {
    const base = templates[selected].get();
    setBrandColor(base.layout?.brandColor ?? "#2563eb");
  }, [selected, templates]);

  /**
   * Parsea líneas "clave=valor" en un objeto de tokens para el renderizado.
   */
  const parseTokens = React.useCallback((text: string) => {
    const ctx: Record<string, any> = {};
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const k = line.slice(0, eq).trim();
      const v = line.slice(eq + 1).trim();
      ctx[k] = v;
    }
    return ctx;
  }, []);

  /**
   * Overrides parciales que se aplicarán sobre la plantilla seleccionada al clonar.
   * Sólo se incluyen propiedades con contenido no vacío para evitar sobreescrituras innecesarias.
   */
  const overrides: Partial<EmailTemplate> = React.useMemo(() => {
    const o: Partial<EmailTemplate> = {};
    if (from.trim()) o.from = from;
    if (subject.trim()) o.subject = subject;
    if (bodyHtml.trim()) o.bodyHtml = bodyHtml;
    const layout: EmailTemplate["layout"] = {};
    if (brandColor.trim()) layout.brandColor = brandColor;
    if (headerHtml.trim()) layout.headerHtml = headerHtml;
    if (footerHtml.trim()) layout.footerHtml = footerHtml;
    if (Object.keys(layout).length) o.layout = layout;
    return o;
  }, [from, subject, bodyHtml, brandColor, headerHtml, footerHtml]);

  /**
   * HTML de vista previa generado a partir del clon de la plantilla y los tokens parseados.
   */
  const preview = React.useMemo(() => {
    const tpl = templates[selected].clone(overrides).get();
    return renderEmail(tpl, parseTokens(tokensText));
  }, [templates, selected, overrides, tokensText, parseTokens]);

  // ---------- acciones
  /** Clona la plantilla con overrides y la añade al Outbox. */
  const cloneAndAdd = () => setOutbox((prev) => [...prev, preview]);
  /** Carga la plantilla base seleccionada en los campos de overrides. */
  const loadTemplateIntoOverrides = () => {
    const base = templates[selected].get();
    setFrom(base.from ?? "");
    setSubject(base.subject ?? "");
    setBodyHtml(base.bodyHtml ?? "");
    setHeaderHtml(base.layout?.headerHtml ?? "");
    setFooterHtml(base.layout?.footerHtml ?? "");
    setBrandColor(base.layout?.brandColor ?? brandColor);
  };
  /** Limpia los campos de overrides (excepto color por defecto). */
  const clearOverrides = () => {
    setFrom(""); setSubject(""); setBodyHtml("");
    setHeaderHtml(""); setFooterHtml("");
  };

  // ---------- UI (Tailwind básico, sin dependencias externas)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 p-4 items-start">
      {/* Panel izquierdo: controles */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-4 space-y-3">
        <h3 className="text-lg font-semibold">Estudio de Plantillas de Email (Prototype)</h3>

  <label className="text-xs text-gray-600">Plantilla</label>
        <select
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-zinc-800 text-sm"
          value={selected}
          onChange={(e) => setSelected(e.target.value as TemplateKey)}
        >
          {TEMPLATE_KEYS.map((k) => (
            <option key={k} value={k}>
              {k === "welcome" ? "welcome (bienvenida)" : k === "reset_password" ? "reset_password (restablecer)" : "newsletter (boletín)"}
            </option>
          ))}
        </select>

        <div className="flex gap-2 pt-1">
          <button
            className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700"
            onClick={loadTemplateIntoOverrides}
          >Cargar base → overrides</button>
          <button
            className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700"
            onClick={clearOverrides}
          >Limpiar overrides</button>
        </div>

  <label className="text-xs text-gray-600">Remitente (override)</label>
        <input
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-zinc-800 text-sm"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="noreply@acme.com"
        />

  <label className="text-xs text-gray-600">Asunto (override)</label>
        <input
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-zinc-800 text-sm"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="¡Bienvenido(a), {{first_name}}!"
        />

  <label className="text-xs text-gray-600">Color de marca ({'{{brand}}'})</label>
        <input
          type="color"
          className="w-full h-10 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-zinc-800 p-1"
          value={brandColor}
          onChange={(e) => setBrandColor(e.target.value)}
        />

        <label className="text-xs text-gray-600">Header HTML (override)</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-zinc-800 text-sm resize-y"
          value={headerHtml}
          onChange={(e) => setHeaderHtml(e.target.value)}
        />

        <label className="text-xs text-gray-600">Body HTML (override)</label>
        <textarea
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-zinc-800 text-sm resize-y"
          value={bodyHtml}
          onChange={(e) => setBodyHtml(e.target.value)}
        />

        <label className="text-xs text-gray-600">Footer HTML (override)</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-zinc-800 text-sm resize-y"
          value={footerHtml}
          onChange={(e) => setFooterHtml(e.target.value)}
        />

        <hr className="my-2 border-gray-200 dark:border-gray-700" />

        <label className="text-xs text-gray-600">Tokens (clave=valor por línea)</label>
        <textarea
          rows={8}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-zinc-800 text-sm resize-y"
          value={tokensText}
          onChange={(e) => setTokensText(e.target.value)}
        />

        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-sm hover:bg-gray-50 dark:hover:bg-zinc-700"
            onClick={cloneAndAdd}
          >Clonar y añadir a Outbox</button>
        </div>

        <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-2">
          Roles aquí:
          <ul className="list-disc pl-4 mt-1">
            <li><b>Prototype</b>: <code>Prototype&lt;EmailTemplate&gt;</code></li>
            <li><b>ConcretePrototype</b>: <code>EmailTemplatePrototype</code> (oculto tras la interfaz)</li>
            <li><b>Cliente</b>: este componente</li>
          </ul>
        </div>
      </div>

      {/* Panel derecho: Preview + Outbox */}
      <div className="grid gap-4">
        <section>
          <div className="font-semibold mb-2">Vista previa</div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800/50">
              <div className="text-xs text-gray-500">Remitente</div>
              <div className="font-semibold">{preview.from}</div>
              <div className="text-xs text-gray-500 mt-2">Asunto</div>
              <div>{preview.subject}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: preview.html }} />
          </div>
        </section>

        <section>
          <div className="font-semibold mb-2">Outbox (clones renderizados)</div>
          {outbox.length === 0 ? (
            <div className="text-sm text-gray-500">Aún no hay clones. Usa “Clonar y añadir”.</div>
          ) : (
            <div className="grid gap-3">
              {outbox.map((em, i) => (
                <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800/50">
                    <div className="text-xs text-gray-500">Remitente</div>
                    <div className="font-semibold">{em.from}</div>
                    <div className="text-xs text-gray-500 mt-2">Asunto</div>
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
}

import React from "react";
import type { EmailTemplate } from "./interfaces/email-template";
import { EmailTemplatePrototype } from "./concrete-prototype";
import { renderEmail } from "./helpers/helpers";

export default function EmailTemplateStudio() {
  /** Base templates (Prototypes) — create once */
  const templates = React.useMemo(() => {
    const welcome = new EmailTemplatePrototype({
      from: "noreply@acme.com",
      subject: "Welcome to {{app_name}}, {{first_name}}!",
      bodyHtml: `
        <div style="padding:16px">
          <p>Hi {{first_name}},</p>
          <p>Thanks for joining <b>{{app_name}}</b>! We're thrilled to have you.</p>
          <p>Get started by exploring your dashboard.</p>
        </div>
      `,
      layout: {
        brandColor: "#2563eb",
        headerHtml: `
          <div style="background: {{brand}}; color: #fff; padding: 14px; border-radius: 10px 10px 0 0;">
            <strong>{{app_name}}</strong>
          </div>
        `,
        footerHtml: `
          <hr/>
          <p style="color:#6b7280; font-size:12px">— The {{app_name}} Team</p>
        `,
      },
      tags: ["welcome", "onboarding"],
    } as EmailTemplate);

    const reset = new EmailTemplatePrototype({
      from: "security@acme.com",
      subject: "Reset your {{app_name}} password",
      bodyHtml: `
        <div style="padding:16px">
          <p>We received a request to reset your password.</p>
          <p><a href="{{reset_link}}">Click here to reset</a>. This link expires in {{ttl_minutes}} minutes.</p>
        </div>
      `,
      layout: {
        brandColor: "#475569",
        headerHtml: `
          <div style="background: {{brand}}; color: #fff; padding: 14px; border-radius: 10px 10px 0 0;">
            <strong>{{app_name}} • Security</strong>
          </div>
        `,
        footerHtml: `
          <hr/>
          <p style="color:#6b7280; font-size:12px">If you didn’t request this, you can ignore this email.</p>
        `,
      },
      tags: ["security", "password-reset"],
    } as EmailTemplate);

    const newsletter = new EmailTemplatePrototype({
      from: "news@acme.com",
      subject: "{{app_name}} Weekly — Issue #{{issue}}",
      bodyHtml: `
        <div style="padding:16px">
          <h2 style="margin:0 0 8px 0">{{headline}}</h2>
          <p>{{summary}}</p>
          <p><a href="{{cta_url}}">{{cta_label}}</a></p>
        </div>
      `,
      layout: {
        brandColor: "#16a34a",
        headerHtml: `
          <div style="background: {{brand}}; color: #fff; padding: 14px; border-radius: 10px 10px 0 0;">
            <strong>{{app_name}} Newsletter</strong>
          </div>
        `,
        footerHtml: `
          <hr/>
          <p style="color:#6b7280; font-size:12px">You’re receiving this because you subscribed to {{app_name}} updates.</p>
        `,
      },
      tags: ["newsletter"],
    } as EmailTemplate);

    return {
      welcome,
      reset_password: reset,
      newsletter,
    };
  }, []);

  type TemplateKey = keyof typeof templates;

  /* UI state */
  const [selected, setSelected] = React.useState<TemplateKey>("welcome");

  // overrides (leave blank to keep base)
  const [from, setFrom] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [brandColor, setBrandColor] = React.useState("#2563eb");
  const [headerHtml, setHeaderHtml] = React.useState("");
  const [bodyHtml, setBodyHtml] = React.useState("");
  const [footerHtml, setFooterHtml] = React.useState("");

  // tokens (key=value per line)
  const [tokensText, setTokensText] = React.useState(
    [
      "first_name=Ana",
      "app_name=FailFast",
      "reset_link=https://app.example.com/reset?token=XYZ",
      "ttl_minutes=30",
      "headline=Shiny new features",
      "summary=We’ve shipped improvements to performance and stability.",
      "issue=42",
      "cta_label=Read more",
      "cta_url=https://blog.example.com/issue-42",
    ].join("\n")
  );

  // Outbox of rendered emails
  const [outbox, setOutbox] = React.useState<Array<{ from: string; subject: string; html: string }>>([]);

  // Sync brand color when template changes (convenience)
  React.useEffect(() => {
    const base = templates[selected].get();
    setBrandColor(base.layout?.brandColor ?? "#2563eb");
    // keep other overrides as user typed
  }, [selected, templates]);

  const parseTokens = React.useCallback((text: string) => {
    const ctx: Record<string, any> = {};
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const k = line.slice(0, eq).trim();
      const v = line.slice(eq + 1).trim();
      ctx[k] = v;
    }
    return ctx;
  }, []);

  // Build overrides only for provided fields
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

  // Live preview: clone + render
  const preview = React.useMemo(() => {
    const tpl = templates[selected].clone(overrides).get();
    return renderEmail(tpl, parseTokens(tokensText));
  }, [templates, selected, overrides, tokensText, parseTokens]);

  const cloneAndAdd = () => setOutbox((prev) => [...prev, preview]);
  const loadTemplateIntoOverrides = () => {
    const base = templates[selected].get();
    setFrom(base.from);
    setSubject(base.subject);
    setBodyHtml(base.bodyHtml);
    setHeaderHtml(base.layout?.headerHtml ?? "");
    setFooterHtml(base.layout?.footerHtml ?? "");
    setBrandColor(base.layout?.brandColor ?? brandColor);
  };
  const clearOverrides = () => {
    setFrom("");
    setSubject("");
    setBodyHtml("");
    setHeaderHtml("");
    setFooterHtml("");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16, padding: 16, alignItems: "start" }}>
      {/* Controls */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
        <h3 style={{ marginTop: 0 }}>Email Template Studio (Prototype)</h3>

        <label>Template</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value as TemplateKey)}>
          {Object.keys(templates).map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 8, margin: "4px 0 10px" }}>
          <button onClick={loadTemplateIntoOverrides}>Load template into overrides</button>
          <button onClick={clearOverrides}>Clear overrides</button>
        </div>

        <label>From (override)</label>
        <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="noreply@acme.com" />

        <label>Subject (override)</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Welcome, {{first_name}}!" />

        <label>Brand Color ({"{{brand}}"})</label>
        <input type="color" style={{  height: 38, padding: 0 }} value={brandColor} onChange={(e) => setBrandColor(e.target.value)} />

        <label>Header HTML (override)</label>
        <textarea style={{ resize: "vertical" }} rows={3} value={headerHtml} onChange={(e) => setHeaderHtml(e.target.value)} />

        <label>Body HTML (override)</label>
        <textarea style={{  resize: "vertical" }} rows={6} value={bodyHtml} onChange={(e) => setBodyHtml(e.target.value)} />

        <label>Footer HTML (override)</label>
        <textarea style={{  resize: "vertical" }} rows={3} value={footerHtml} onChange={(e) => setFooterHtml(e.target.value)} />

        <hr style={{ margin: "10px 0" }} />

        <label>Tokens (key=value per line)</label>
        <textarea style={{ resize: "vertical" }} rows={8} value={tokensText} onChange={(e) => setTokensText(e.target.value)} />

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={cloneAndAdd}>Clone & Add to Outbox</button>
        </div>

        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>
          Roles here:
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            <li><b>Prototype</b>: your <code>Prototype&lt;T&gt;</code> interface</li>
            <li><b>ConcretePrototype</b>: <code>EmailTemplatePrototype</code></li>
            <li><b>Client</b>: this UI component</li>
          </ul>
        </div>
      </div>

      {/* Preview + Outbox */}
      <div style={{ display: "grid", gap: 16 }}>
        {/* Live Preview */}
        <section>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Live Preview</div>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: 10, borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
              <div style={{ fontSize: 12, color: "#6b7280" }}>From</div>
              <div style={{ fontWeight: 600 }}>{preview.from}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>Subject</div>
              <div>{preview.subject}</div>
            </div>
            {/* In production, sanitize or render only trusted HTML */}
            <div dangerouslySetInnerHTML={{ __html: preview.html }} />
          </div>
        </section>

        {/* Outbox */}
        <section>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Outbox (Cloned & Rendered)</div>
          {outbox.length === 0 ? (
            <div style={{ color: "#9ca3af", fontSize: 14 }}>No emails yet. Click “Clone & Add to Outbox”.</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {outbox.map((em, i) => (
                <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: 10, borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>From</div>
                    <div style={{ fontWeight: 600 }}>{em.from}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>Subject</div>
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
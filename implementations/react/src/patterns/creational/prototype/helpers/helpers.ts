import type { EmailTemplate } from "../interfaces/email-template";

function pathGet(obj: any, path: string) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}
function interpolate(tpl: string, ctx: Record<string, any>) {
  return tpl.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
    const val = pathGet(ctx, key);
    return val == null ? "" : String(val);
  });
}
export function renderEmail(tpl: EmailTemplate, data: Record<string, any>) {
  const ctx = { ...data, brand: tpl.layout?.brandColor }; // expose brand color as {{brand}}
  const header = tpl.layout?.headerHtml ? interpolate(tpl.layout.headerHtml, ctx) : "";
  const body   = interpolate(tpl.bodyHtml, ctx);
  const footer = tpl.layout?.footerHtml ? interpolate(tpl.layout.footerHtml, ctx) : "";
  return {
    from: interpolate(tpl.from, ctx),
    subject: interpolate(tpl.subject, ctx),
    html: `${header}${body}${footer}`,
  };
}
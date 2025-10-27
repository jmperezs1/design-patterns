export type EmailTemplate = {
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

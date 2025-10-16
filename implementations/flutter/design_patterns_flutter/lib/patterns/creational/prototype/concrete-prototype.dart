import 'interfaces/email_template.dart';
import 'prototype.dart';

class EmailTemplatePrototype implements Prototype<EmailTemplate> {
  final EmailTemplate _base;

  EmailTemplatePrototype(EmailTemplate base) : _base = base;

  @override
  Prototype<EmailTemplate> clone([EmailTemplate? overrides]) {
    // Deep copy base
    final copy = EmailTemplate(
      from: _base.from,
      subject: _base.subject,
      bodyHtml: _base.bodyHtml,
      layout: _base.layout == null
          ? null
          : EmailLayout(
              brandColor: _base.layout!.brandColor,
              headerHtml: _base.layout!.headerHtml,
              footerHtml: _base.layout!.footerHtml,
            ),
      tags: _base.tags == null ? null : List<String>.from(_base.tags!),
    );

    if (overrides == null) return EmailTemplatePrototype(copy);

    // Apply overrides, merging nested layout
    final merged = EmailTemplate(
      from: overrides.from ?? copy.from,
      subject: overrides.subject ?? copy.subject,
      bodyHtml: overrides.bodyHtml ?? copy.bodyHtml,
      layout: (copy.layout != null || overrides.layout != null)
          ? EmailLayout(
              brandColor:
                  overrides.layout?.brandColor ?? copy.layout?.brandColor,
              headerHtml:
                  overrides.layout?.headerHtml ?? copy.layout?.headerHtml,
              footerHtml:
                  overrides.layout?.footerHtml ?? copy.layout?.footerHtml,
            )
          : null,
      tags: overrides.tags ?? copy.tags,
    );

    return EmailTemplatePrototype(merged);
  }

  @override
  EmailTemplate get() {
    return EmailTemplate(
      from: _base.from,
      subject: _base.subject,
      bodyHtml: _base.bodyHtml,
      layout: _base.layout == null
          ? null
          : EmailLayout(
              brandColor: _base.layout!.brandColor,
              headerHtml: _base.layout!.headerHtml,
              footerHtml: _base.layout!.footerHtml,
            ),
      tags: _base.tags == null ? null : List<String>.from(_base.tags!),
    );
  }
}

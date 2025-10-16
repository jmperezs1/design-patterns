class EmailLayout {
  final String? brandColor;
  final String? headerHtml;
  final String? footerHtml;

  const EmailLayout({this.brandColor, this.headerHtml, this.footerHtml});

  EmailLayout copyWith({
    String? brandColor,
    String? headerHtml,
    String? footerHtml,
  }) {
    return EmailLayout(
      brandColor: brandColor ?? this.brandColor,
      headerHtml: headerHtml ?? this.headerHtml,
      footerHtml: footerHtml ?? this.footerHtml,
    );
  }
}

class EmailTemplate {
  final String? from;
  final String? subject;
  final String? bodyHtml;
  final EmailLayout? layout;
  final List<String>? tags;

  const EmailTemplate({
    this.from,
    this.subject,
    this.bodyHtml,
    this.layout,
    this.tags,
  });

  EmailTemplate copyWith({
    String? from,
    String? subject,
    String? bodyHtml,
    EmailLayout? layout,
    List<String>? tags,
  }) {
    return EmailTemplate(
      from: from ?? this.from,
      subject: subject ?? this.subject,
      bodyHtml: bodyHtml ?? this.bodyHtml,
      layout: layout ?? this.layout,
      tags: tags ?? this.tags,
    );
  }
}

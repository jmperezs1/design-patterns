const String prototypeInterface = r"""
abstract class Prototype<T> {
  Prototype<T> clone([T? overrides]);
  T get();
}
""";

const String emailInterfaces = r"""
class EmailLayout { /* brandColor, headerHtml, footerHtml */ }
class EmailTemplate { /* from, subject, bodyHtml, layout, tags */ }
""";

const String concretePrototype = r"""
class EmailTemplatePrototype implements Prototype<EmailTemplate> {
  final EmailTemplate _base;
  EmailTemplatePrototype(EmailTemplate base) : _base = base;
  @override
  Prototype<EmailTemplate> clone([EmailTemplate? overrides]) { /* deep copy + merge */ }
  @override
  EmailTemplate get() { /* deep copy */ }
}
""";

const String clientDemo = r"""
class EmailTemplateStudio extends StatefulWidget { /* ... */ }
// Selecciona plantilla base, aplica overrides, previsualiza y clona a Outbox
""";

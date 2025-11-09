import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/template/components/contact_form.dart';
import 'package:design_patterns_flutter/patterns/behavioral/template/components/signup_form.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class TemplateMethodScreen extends StatelessWidget {
  const TemplateMethodScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Template Method',
      badge: 'Behavioral',
      resumen:
          'Define el esqueleto de un algoritmo en una clase base y deja que las subclases redefinan pasos específicos sin cambiar la estructura global.',
      problematicaGeneral:
          'Cuando varios procesos comparten la misma secuencia pero difieren en pasos concretos, la duplicación y los condicionales proliferan.',
      solucionGeneral:
          'Extraer la orquestación a una clase base con un método inmutable que coordina los pasos; subclases implementan los pasos variables.',
      casoEspecifico:
          'Flujos de formularios: Signup y Contact comparten validar → enviar → afterSuccess → mensaje; cada uno implementa sus detalles.',
      solucionEspecifica:
          'FormTemplate.submit() orquesta el flujo. SimpleForm delega la acción a la instancia del flow (SignupFlow / ContactFlow).',
      codeSnippets: const [
        CodeSnippet(title: 'abstract-class.dart', code: 'abstract class FormTemplate { Future<String> submit(Map<String,dynamic>); /* ... */ }'),
        CodeSnippet(title: 'concrete-signup.dart', code: 'class SignupFlow extends FormTemplate { /* validate/send/afterSuccess/successMessage */ }'),
        CodeSnippet(title: 'components/simple_form.dart', code: 'class SimpleForm extends StatefulWidget { /* UI + submit calling flow.submit */ }'),
      ],
      playground: Column(
        children: [
          const SizedBox(height: 6),
          const Text('Cómo interactuar: completa los campos y envía el formulario.'),
          const SizedBox(height: 8),
          // two forms side by side on wide layouts
          LayoutBuilder(builder: (context, c) {
            final twoCols = c.maxWidth > 720;
            if (twoCols) {
              return Row(
                children: [const Expanded(child: SignupPage()), const SizedBox(width: 12), const Expanded(child: ContactPage())],
              );
            }
            return Column(children: [const SignupPage(), const SizedBox(height: 12), const ContactPage()]);
          }),
        ],
      ),
      playgroundExplicacion:
          'Ambos formularios comparten el algoritmo definido en la clase base. Cambian sólo validación, llamada a backend simulada y mensaje final.',
    );
  }
}

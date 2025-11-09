import 'package:flutter/material.dart';
import '../concrete_support.dart';
import 'simple_form.dart';

class ContactPage extends StatelessWidget {
  const ContactPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SimpleForm(
      title: 'Contact support',
      flow: ContactFlow(),
      fields: [
        FieldSpec(
          name: 'subject',
          label: 'Subject',
          placeholder: 'Billing issue',
        ),
        FieldSpec(
          name: 'message',
          label: 'Message',
          type: 'text',
          placeholder: 'Describe the problem...',
        ),
        FieldSpec(name: 'priority', label: 'Priority (low/normal/high)'),
      ],
    );
  }
}

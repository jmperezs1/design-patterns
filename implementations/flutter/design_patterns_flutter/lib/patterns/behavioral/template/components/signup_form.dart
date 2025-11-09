import 'package:flutter/material.dart';
import '../concrete_signup.dart';
import 'simple_form.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SimpleForm(
      title: 'Create account',
      flow: SignupFlow(),
      fields: [
        FieldSpec(
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'ada@company.com',
        ),
        FieldSpec(
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: '••••••••',
        ),
      ],
    );
  }
}

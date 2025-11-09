import 'package:flutter/material.dart';
import '../abstract_class.dart';

class FieldSpec {
  final String name;
  final String label;
  final String? type; // e.g. 'email', 'password'
  final String? placeholder;

  FieldSpec({
    required this.name,
    required this.label,
    this.type,
    this.placeholder,
  });
}

class SimpleForm extends StatefulWidget {
  final FormTemplate flow;
  final List<FieldSpec> fields;
  final String title;

  const SimpleForm({
    super.key,
    required this.flow,
    required this.fields,
    required this.title,
  });

  @override
  State<SimpleForm> createState() => _SimpleFormState();
}

class _SimpleFormState extends State<SimpleForm> {
  final Map<String, TextEditingController> _controllers = {};
  String status = 'idle'; // idle | loading | done | error
  String message = '';

  @override
  void initState() {
    super.initState();
    for (final f in widget.fields) {
      _controllers[f.name] = TextEditingController();
    }
  }

  @override
  void dispose() {
    for (final c in _controllers.values) c.dispose();
    super.dispose();
  }

  Future<void> _onSubmit() async {
    setState(() {
      status = 'loading';
      message = '';
    });
    final formData = <String, dynamic>{};
    for (final f in widget.fields) {
      formData[f.name] = _controllers[f.name]?.text ?? '';
    }

    try {
      final msg = await widget.flow.submit(formData);
      setState(() {
        message = msg;
        status = 'done';
      });
    } catch (e) {
      setState(() {
        message = e.toString();
        status = 'error';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(color: Theme.of(context).colorScheme.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              widget.title,
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            for (final f in widget.fields) ...[
              TextFormField(
                controller: _controllers[f.name],
                decoration: InputDecoration(
                  labelText: f.label,
                  hintText: f.placeholder,
                ),
                obscureText: f.type == 'password',
                keyboardType: f.type == 'email'
                    ? TextInputType.emailAddress
                    : TextInputType.text,
              ),
              const SizedBox(height: 8),
            ],
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: status == 'loading' ? null : _onSubmit,
              child: Text(status == 'loading' ? 'Submitting...' : 'Submit'),
            ),
            const SizedBox(height: 8),
            if (status == 'error')
              Text(message, style: const TextStyle(color: Colors.redAccent)),
            if (status == 'done')
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Theme.of(
                    context,
                  ).colorScheme.surfaceVariant.withOpacity(.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                padding: const EdgeInsets.all(8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Success:',
                      style: const TextStyle(fontWeight: FontWeight.w700),
                    ),
                    Text(message),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

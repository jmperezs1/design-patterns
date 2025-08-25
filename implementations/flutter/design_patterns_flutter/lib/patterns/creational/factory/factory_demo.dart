import 'package:design_patterns_flutter/patterns/creational/factory/factory.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';

class FactoryDemo extends StatelessWidget {
  const FactoryDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        createWrapper(
          Variant.success,
          const Text('Archivo subido correctamente'),
        ),
        const SizedBox(height: 12),
        createWrapper(
          Variant.warning,
          const Text('Espacio de almacenamiento limitado'),
        ),
        const SizedBox(height: 12),
        createWrapper(Variant.alert, const Text('Error de conexión')),
        const SizedBox(height: 12),
        createWrapper(
          Variant.informative,
          const Text('Nueva versión disponible'),
        ),
      ],
    );
  }
}

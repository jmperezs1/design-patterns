const String factoryDemo = r"""
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
""";

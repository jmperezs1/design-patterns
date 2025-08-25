const String factorySummary = '''
Este módulo demuestra el patrón de diseño **Factory** aplicado a la capa de presentación en Flutter. La función `createWrapper(variant, child)` actúa como fábrica que construye y devuelve un contenedor (`Widget`) completamente configurado. A partir del parámetro `variant` (`success`, `alert`, `informative`, `warning`), la fábrica **encapsula** y **centraliza** todas las decisiones de creación —iconografía, paleta de colores y estructura— garantizando una interfaz única para el cliente y resultados visuales consistentes.
''';

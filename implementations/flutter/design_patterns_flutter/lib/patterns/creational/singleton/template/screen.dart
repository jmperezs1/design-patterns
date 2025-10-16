import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/creational/singleton/code/code.dart'
    as singleton_code;
import 'package:design_patterns_flutter/patterns/creational/singleton/code/usage.dart'
    as singleton_usage;
import 'package:design_patterns_flutter/patterns/creational/singleton/singleton_demo.dart';
import 'package:flutter/material.dart';

class SingletonScreen extends StatelessWidget {
  const SingletonScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Singleton',
      badge: 'Creacional',
      resumen:
          'Singleton garantiza una sola instancia de una clase y un punto de acceso global. Útil para servicios compartidos (API, configuración, caché) donde múltiples widgets consumen el mismo recurso.',
      problematicaGeneral:
          'Varias partes de la app requieren el mismo servicio/estado (por ejemplo, cliente HTTP). Crear instancias repetidas complica el ciclo de vida, el cacheo y aumenta el acoplamiento.',
      solucionGeneral:
          'Exponer un constructor privado y una instancia estática global. Controlar el acceso a través de `Class.instance` o un factory que retorna siempre la misma instancia.',
      casoEspecifico:
          'Consumir PokeAPI desde varias pantallas sin duplicar lógica de red ni crear múltiples clientes. La UI construye tarjetas de Pokémon reutilizando el mismo servicio.',
      solucionEspecifica:
          'Se implementa `PokemonApi` como Singleton con constructor privado y miembro estático `instance`. La UI usa `PokemonApi.instance.getPokemonData(...)` para obtener datos y renderizarlos.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_singleton.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/singleton.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'singleton.dart',
          code: singleton_code.singletonCode,
        ),
        CodeSnippet(title: 'usage.dart', code: singleton_usage.singletonUsage),
      ],
      playground: const SingletonDemo(),
      playgroundExplicacion:
          'Este playground usa una única instancia de PokemonApi para traer datos sin recrear el cliente. Prueba distintas búsquedas y notarás que la instancia es la misma; la UI sólo consume el servicio compartido.',
    );
  }
}

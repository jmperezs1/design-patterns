import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';
import '../proxy_demo.dart';

class ProxyScreen extends StatelessWidget {
  const ProxyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Proxy',
      badge: 'Structural',
      resumen:
          'Proporciona un sustituto que controla acceso a un objeto real (caché, protección, carga perezosa).',
      problematicaGeneral:
          'Queremos añadir caché y compartir solicitudes en vuelo sin cambiar la interfaz del sujeto real.',
      solucionGeneral:
          'Crear un Proxy que implemente la misma interfaz que el RealSubject y decida si devuelve datos cacheados, comparte inflight requests, o delega al RealSubject.',
      casoEspecifico:
          'Servicio de productos: CachingProductProxy añade caché, comparte solicitudes simultáneas y reporta métricas.',
      solucionEspecifica:
          'Proxy mantiene cache e inflight maps; en hit devuelve cache; si hay request en vuelo devuelve la promesa compartida; si no, delega al RealSubject y cachea resultado.',
      codeSnippets: const [
        CodeSnippet(
          title: 'subject.dart',
          code:
              'abstract class ProductService { Future<Product> getProduct(String id); }',
        ),
        CodeSnippet(
          title: 'proxy.dart',
          code:
              'class CachingProductProxy implements ProductService { /* cache, inflight, getStats, clearCache */ }',
        ),
      ],
      playground: const ProxyDemo(),
      playgroundExplicacion:
          'Cambia el ID, pulsa Cargar o Ráfaga x5 para observar caché, requests compartidas y métricas.',
    );
  }
}

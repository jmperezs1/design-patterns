import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/observer/observer_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class ObserverScreen extends StatelessWidget {
  const ObserverScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Observer',
      badge: 'Behavioral',
      resumen:
          'Permite que objetos (Observers) reaccionen a cambios de otro objeto (Subject) sin acoplamiento directo, facilitando extensión dinámica de comportamiento.',
      problematicaGeneral:
          'Sin un mecanismo de suscripción, múltiples componentes podrían sondear o depender rígidamente de un emisor, aumentando acoplamiento y complejidad para añadir nuevas reacciones.',
      solucionGeneral:
          'Definir un Subject con métodos para suscribir/desuscribir observers y una notificación centralizada. Los observers implementan update() y se registran dinámicamente.',
      casoEspecifico:
          'Un hub de datos de mercado emite cotizaciones aleatorias. Observers: alerta de umbral, promedio móvil, tablero de símbolos y registro textual.',
      solucionEspecifica:
          'El MarketDataHub genera ticks y notifica. Cada observer procesa sólo los símbolos relevantes y mantiene su propio estado (logs, promedio, snapshot).',
    diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_observer.png',
    diagramaSolucionEspecificaAssetPath: 'assets/diagrams/observer.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'observer.dart',
          code: 'abstract class Observer<T> { void update(T data); }',
        ),
        CodeSnippet(
          title: 'subject.dart',
          code:
              'abstract class Subject<T> { void addObserver(Observer<T> o); void removeObserver(Observer<T> o); void notifyObservers(T data); }',
        ),
        CodeSnippet(
          title: 'market_data_hub.dart',
          code:
              'class MarketDataHub implements Subject<Quote> { /* start/stop + notify */ }',
        ),
        CodeSnippet(
          title: 'threshold_alert.dart',
          code:
              'class ThresholdAlert implements Observer<Quote> { /* logs si price >= threshold */ }',
        ),
        CodeSnippet(
          title: 'simple_moving_average.dart',
          code:
              'class SimpleMovingAverage implements Observer<Quote> { /* mantiene ventana y average */ }',
        ),
        CodeSnippet(
          title: 'ticker_snapshot.dart',
          code:
              'class TickerSnapshot implements Observer<Quote> { /* última cotización + dirección */ }',
        ),
      ],
      playground: const ObserverDemo(),
      playgroundExplicacion:
          'Activa/desactiva suscripciones y modifica parámetros. Observa cómo cada observer reacciona a los ticks sólo cuando está suscrito.',
    );
  }
}

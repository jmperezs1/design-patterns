import 'package:flutter/material.dart';
import 'market_data_hub.dart';
import 'threshold_alert.dart';
import 'simple_moving_average.dart';
import 'ticker_snapshot.dart';
import 'observer.dart';
import 'types.dart';

class _LogObserver implements Observer<Quote> {
  final void Function(String) onLine;
  _LogObserver(this.onLine);
  @override
  void update(Quote q) {
    onLine(
      '${q.ts.toLocal().toIso8601String().substring(11, 19)} • ${q.symbol} → \$${q.price.toStringAsFixed(2)}',
    );
  }
}

class ObserverDemo extends StatefulWidget {
  const ObserverDemo({super.key});
  @override
  State<ObserverDemo> createState() => _ObserverDemoState();
}

class _ObserverDemoState extends State<ObserverDemo> {
  final hub = MarketDataHub();

  bool running = false;
  String symbol = 'AAPL';
  String threshold = '200';
  String smaWindow = '5';

  bool alertSub = true;
  bool smaSub = true;
  bool tickerSub = true;
  bool logSub = true;

  late final ThresholdAlert thresholdAlert;
  late final SimpleMovingAverage sma;
  late final TickerSnapshot snapshot;
  final List<String> log = [];
  late final _LogObserver logObserver;

  @override
  void initState() {
    super.initState();
    thresholdAlert = ThresholdAlert(symbol, double.tryParse(threshold) ?? 0);
    sma = SimpleMovingAverage(symbol, int.tryParse(smaWindow) ?? 5);
    snapshot = TickerSnapshot();
    logObserver = _LogObserver(
      (line) => setState(() {
        log.insert(0, line);
        if (log.length > 40) log.removeLast();
      }),
    );
    // subscribe initial
    _applySubscriptions();
  }

  void _applySubscriptions() {
    if (alertSub)
      hub.addObserver(thresholdAlert);
    else
      hub.removeObserver(thresholdAlert);
    if (smaSub)
      hub.addObserver(sma);
    else
      hub.removeObserver(sma);
    if (tickerSub)
      hub.addObserver(snapshot);
    else
      hub.removeObserver(snapshot);
    if (logSub)
      hub.addObserver(logObserver);
    else
      hub.removeObserver(logObserver);
  }

  void _start() {
    hub.start(defaultSymbols);
    setState(() {
      running = true;
    });
  }

  void _stop() {
    hub.stop();
    setState(() {
      running = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(color: cs.outlineVariant),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Observer: Mercado en tiempo real',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Suscribe observadores para reaccionar a cotizaciones de símbolos.',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
                const SizedBox(height: 12),
                LayoutBuilder(
                  builder: (context, c) {
                    final twoCols = c.maxWidth > 860;
                    final controls = _controls(cs);
                    final toggles = _toggles(cs);
                    return twoCols
                        ? Row(
                            children: [
                              Expanded(child: controls),
                              const SizedBox(width: 16),
                              Expanded(child: toggles),
                            ],
                          )
                        : Column(
                            children: [
                              controls,
                              const SizedBox(height: 12),
                              toggles,
                            ],
                          );
                  },
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, c) {
            final twoCols = c.maxWidth > 860;
            final a = _alertCard(cs);
            final b = _smaCard(cs);
            final c1 = _tickerCard(cs);
            final d = _logCard(cs);
            if (twoCols) {
              return Column(
                children: [
                  Row(
                    children: [
                      Expanded(child: a),
                      const SizedBox(width: 16),
                      Expanded(child: b),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(child: c1),
                      const SizedBox(width: 16),
                      Expanded(child: d),
                    ],
                  ),
                ],
              );
            }
            return Column(
              children: [
                a,
                const SizedBox(height: 16),
                b,
                const SizedBox(height: 16),
                c1,
                const SizedBox(height: 16),
                d,
              ],
            );
          },
        ),
      ],
    );
  }

  Widget _controls(ColorScheme cs) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Configuración',
          style: Theme.of(
            context,
          ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          crossAxisAlignment: WrapCrossAlignment.end,
          children: [
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(labelText: 'Símbolo objetivo'),
              value: symbol,
              items: [
                for (final s in defaultSymbols)
                  DropdownMenuItem(value: s, child: Text(s)),
              ],
              onChanged: (v) {
                if (v == null) return;
                setState(() {
                  symbol = v;
                });
                thresholdAlert.setTargetSymbol(v);
                sma.setSymbol(v);
              },
            ),
            SizedBox(
              width: 160,
              child: TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Umbral de alerta (≥)',
                ),
                keyboardType: TextInputType.number,
                initialValue: threshold,
                onChanged: (v) {
                  setState(() {
                    threshold = v;
                  });
                  thresholdAlert.setAbove(double.tryParse(v) ?? 0);
                },
              ),
            ),
            SizedBox(
              width: 160,
              child: TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Ventana Promedio Móvil',
                ),
                keyboardType: TextInputType.number,
                initialValue: smaWindow,
                onChanged: (v) {
                  setState(() {
                    smaWindow = v;
                  });
                  sma.setWindow(int.tryParse(v) ?? 1);
                },
              ),
            ),
            ElevatedButton.icon(
              onPressed: running ? _stop : _start,
              icon: Icon(running ? Icons.stop : Icons.play_arrow),
              label: Text(running ? 'Detener' : 'Iniciar'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _toggles(ColorScheme cs) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Suscripciones',
          style: Theme.of(
            context,
          ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 16,
          runSpacing: 8,
          children: [
            _switchTile('Alerta de Umbral', alertSub, (v) {
              setState(() {
                alertSub = v;
              });
              _applySubscriptions();
            }),
            _switchTile('Promedio móvil', smaSub, (v) {
              setState(() {
                smaSub = v;
              });
              _applySubscriptions();
            }),
            _switchTile('Tablero de símbolos', tickerSub, (v) {
              setState(() {
                tickerSub = v;
              });
              _applySubscriptions();
            }),
            _switchTile('Registro', logSub, (v) {
              setState(() {
                logSub = v;
              });
              _applySubscriptions();
            }),
          ],
        ),
      ],
    );
  }

  Widget _switchTile(String label, bool value, ValueChanged<bool> onChanged) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Switch(value: value, onChanged: onChanged),
        const SizedBox(width: 6),
        Text(label),
      ],
    );
  }

  Widget _alertCard(ColorScheme cs) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: cs.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Alerta de Umbral',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            if (thresholdAlert.logs.isEmpty)
              Text(
                'Sin alertas aún',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              )
            else ...[
              for (final l in thresholdAlert.logs.take(12))
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2),
                  child: Text(l),
                ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _smaCard(ColorScheme cs) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: cs.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Promedio móvil ($symbol)',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Text(
                  sma.average.toStringAsFixed(2),
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  'ventana $smaWindow',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: cs.surfaceVariant.withOpacity(.3),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: cs.outlineVariant),
              ),
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  Icon(Icons.info_outline, size: 18, color: cs.primary),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Se actualiza sólo con ticks del símbolo seleccionado.',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: cs.onSurfaceVariant,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _tickerCard(ColorScheme cs) {
    Color chipColor(Direction? d) {
      switch (d) {
        case Direction.up:
          return Colors.green;
        case Direction.down:
          return Colors.red;
        case Direction.flat:
          return cs.onSurfaceVariant;
        default:
          return cs.onSurfaceVariant;
      }
    }

    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: cs.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Tablero de símbolos',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final s in defaultSymbols)
                  Builder(
                    builder: (context) {
                      final entry = snapshot.data[s];
                      final label = entry == null
                          ? '—'
                          : '\$${entry.price.toStringAsFixed(2)}';
                      return Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: cs.surfaceVariant.withOpacity(.35),
                          borderRadius: BorderRadius.circular(999),
                          border: Border.all(color: cs.outlineVariant),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              s,
                              style: const TextStyle(
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              label,
                              style: TextStyle(
                                color: chipColor(entry?.direction),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _logCard(ColorScheme cs) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: cs.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Registro',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            if (log.isEmpty)
              Text(
                'Aún no hay registros',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              )
            else ...[
              for (final l in log)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2),
                  child: Text(l),
                ),
            ],
          ],
        ),
      ),
    );
  }
}

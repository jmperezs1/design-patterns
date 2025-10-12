import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/banner/banner.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/snackbar/snackbar.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';
import 'banner_factory.dart';
import 'snackbar_factory.dart';

enum _Pref { banner, toast }

class NotificationsDualDemo extends StatefulWidget {
  const NotificationsDualDemo({super.key});
  @override
  State<NotificationsDualDemo> createState() => _NotificationsDualDemoState();
}

class _NotificationsDualDemoState extends State<NotificationsDualDemo> {
  double _prefValue = 0;
  _Pref get _pref => _prefValue < 0.5 ? _Pref.banner : _Pref.toast;

  final List<Widget> _inlineBanners = [];

  final List<Widget> _snackTriggers = [];
  int _triggerKey = 0;

  void _notify(Variant v) {
    if (_pref == _Pref.banner) {
      final widget = switch (v) {
        Variant.success => bannerFactory.createSuccess(
          context,
          const BannerProps(
            title: 'Success',
            description: 'Operación completada correctamente.',
          ),
        ),
        Variant.alert => bannerFactory.createAlert(
          context,
          const BannerProps(
            title: 'Alert',
            description: 'Error de conexión. Intenta nuevamente.',
          ),
        ),
        Variant.informative => bannerFactory.createInformative(
          context,
          const BannerProps(
            title: 'Information',
            description: 'Nueva versión disponible.',
          ),
        ),
        Variant.warning => bannerFactory.createWarning(
          context,
          const BannerProps(
            title: 'Warning',
            description: 'Espacio de almacenamiento limitado.',
          ),
        ),
      };
      setState(() => _inlineBanners.insert(0, widget));
    } else {
      final trigger = KeyedSubtree(
        key: ValueKey(_triggerKey++),
        child: switch (v) {
          Variant.success => snackbarFactory.createSuccess(
            context,
            const SnackbarProps(
              title: 'Success',
              message: 'Saved successfully',
            ),
          ),
          Variant.alert => snackbarFactory.createAlert(
            context,
            const SnackbarProps(title: 'Error', message: 'Connection failed'),
          ),
          Variant.informative => snackbarFactory.createInformative(
            context,
            const SnackbarProps(
              title: 'Heads up',
              message: 'New features available',
            ),
          ),
          Variant.warning => snackbarFactory.createWarning(
            context,
            const SnackbarProps(title: 'Warning', message: 'Low storage'),
          ),
        },
      );
      setState(() => _snackTriggers.add(trigger));
    }
  }

  void _clearInline() => setState(() => _inlineBanners.clear());

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Stack(
      fit: StackFit.passthrough,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(12, 12, 12, 4),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Preferencia de notificación',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          'Banner en línea',
                          style: TextStyle(
                            color: _pref == _Pref.banner
                                ? cs.primary
                                : cs.onSurfaceVariant,
                          ),
                        ),
                        Expanded(
                          child: Slider(
                            min: 0,
                            max: 1,
                            divisions: 1,
                            value: _prefValue,
                            onChanged: (v) => setState(() => _prefValue = v),
                          ),
                        ),
                        Text(
                          'SnackBar',
                          style: TextStyle(
                            color: _pref == _Pref.toast
                                ? cs.primary
                                : cs.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),

            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                ElevatedButton(
                  onPressed: () => _notify(Variant.success),
                  child: const Text('Success'),
                ),
                ElevatedButton(
                  onPressed: () => _notify(Variant.alert),
                  child: const Text('Alert'),
                ),
                ElevatedButton(
                  onPressed: () => _notify(Variant.informative),
                  child: const Text('Info'),
                ),
                ElevatedButton(
                  onPressed: () => _notify(Variant.warning),
                  child: const Text('Warning'),
                ),
                if (_inlineBanners.isNotEmpty)
                  OutlinedButton.icon(
                    onPressed: _clearInline,
                    icon: const Icon(Icons.clear),
                    label: const Text('Limpiar banners'),
                  ),
              ],
            ),

            const SizedBox(height: 16),
            if (_inlineBanners.isEmpty)
              Container(
                height: 80,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: cs.surfaceVariant.withOpacity(.3),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: cs.outlineVariant),
                ),
                child: const Text(
                  'No hay banners. Dispara uno con los botones.',
                ),
              )
            else
              Column(
                children: [
                  for (final w in _inlineBanners) ...[
                    w,
                    const SizedBox(height: 8),
                  ],
                ],
              ),
          ],
        ),

        ..._snackTriggers,
      ],
    );
  }
}

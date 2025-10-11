import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/code/viewer.dart';
import 'package:flutter/material.dart';

class ZoomableAssetImage extends StatefulWidget {
  final String assetPath;
  final double height;
  final bool showControls;

  const ZoomableAssetImage({
    super.key,
    required this.assetPath,
    this.height = 260,
    this.showControls = true,
  });

  @override
  State<ZoomableAssetImage> createState() => _ZoomableAssetImageState();
}

class _ZoomableAssetImageState extends State<ZoomableAssetImage> {
  final TransformationController _controller = TransformationController();
  static const double _minScale = 1.0;
  static const double _maxScale = 5.0;

  void _setScale(double newScale) {
    newScale = newScale.clamp(_minScale, _maxScale);
    setState(() {
      _controller.value = Matrix4.identity()..scale(newScale, newScale, 1.0);
    });
  }

  double get _currentScale => _controller.value.storage[0];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: Container(
        color: cs.surfaceVariant.withOpacity(0.25),
        height: widget.height,
        child: Stack(
          children: [
            Positioned.fill(
              child: InteractiveViewer(
                minScale: _minScale,
                maxScale: _maxScale,
                boundaryMargin: const EdgeInsets.all(32),
                transformationController: _controller,
                child: Image.asset(widget.assetPath, fit: BoxFit.contain),
              ),
            ),
            if (widget.showControls)
              Positioned(
                right: 8,
                top: 8,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: cs.surface.withOpacity(0.9),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: cs.outlineVariant),
                    boxShadow: [
                      BoxShadow(
                        blurRadius: 6,
                        color: Colors.black.withOpacity(0.08),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.zoom_out),
                        tooltip: 'Alejar',
                        onPressed: () => _setScale(_currentScale / 1.25),
                      ),
                      IconButton(
                        icon: const Icon(Icons.refresh),
                        tooltip: 'Reiniciar',
                        onPressed: () => _setScale(1.0),
                      ),
                      IconButton(
                        icon: const Icon(Icons.zoom_in),
                        tooltip: 'Acercar',
                        onPressed: () => _setScale(_currentScale * 1.25),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
// (old Stateless ZoomableAssetImage removed in favor of the Stateful version with controls)

class PatternSection extends StatelessWidget {
  final String title;
  final Widget child;
  const PatternSection({super.key, required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cs.outlineVariant),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w700,
              color: cs.primary,
              letterSpacing: .2,
            ),
          ),
          const SizedBox(height: 8),
          child,
        ],
      ),
    );
  }
}

class PatternTemplate extends StatelessWidget {
  final String heading;
  final String badge;
  final String resumen;
  final String problematicaGeneral;
  final String solucionGeneral;
  final String casoEspecifico;
  final String solucionEspecifica;
  // Diagramas opcionales
  final String? diagramaSolucionGeneralAssetPath; // assets/... png (opcional)
  final String?
  diagramaSolucionEspecificaAssetPath; // assets/... png (opcional)
  final Widget? codigoFuente; // opcional (manual)
  final List<CodeSnippet> codeSnippets; // opcional (auto render)
  final Widget playground;

  const PatternTemplate({
    super.key,
    required this.heading,
    required this.badge,
    required this.resumen,
    required this.problematicaGeneral,
    required this.solucionGeneral,
    required this.casoEspecifico,
    required this.solucionEspecifica,
    this.diagramaSolucionGeneralAssetPath,
    this.diagramaSolucionEspecificaAssetPath,
    this.codigoFuente,
    this.codeSnippets = const [],
    required this.playground,
  });

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Problemática / Solución general
          LayoutBuilder(
            builder: (context, c) {
              final twoCols = c.maxWidth > 720;
              if (twoCols) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: PatternSection(
                        title: 'Problemática General',
                        child: Text(problematicaGeneral),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: PatternSection(
                        title: 'Solución General',
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(solucionGeneral),
                            if (diagramaSolucionGeneralAssetPath != null &&
                                diagramaSolucionGeneralAssetPath!
                                    .isNotEmpty) ...[
                              const SizedBox(height: 8),
                              ZoomableAssetImage(
                                assetPath: diagramaSolucionGeneralAssetPath!,
                              ),
                              const SizedBox(height: 6),
                              Text(
                                'Diagrama de la solución general',
                                style: Theme.of(context).textTheme.labelSmall
                                    ?.copyWith(color: cs.onSurfaceVariant),
                              ),
                            ],
                          ],
                        ),
                      ),
                    ),
                  ],
                );
              }
              // Single column path: avoid Expanded in an unbounded height (inside scrollable)
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  PatternSection(
                    title: 'Problemática General',
                    child: Text(problematicaGeneral),
                  ),
                  const SizedBox(height: 12),
                  PatternSection(
                    title: 'Solución General',
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(solucionGeneral),
                        if (diagramaSolucionGeneralAssetPath != null &&
                            diagramaSolucionGeneralAssetPath!.isNotEmpty) ...[
                          const SizedBox(height: 8),
                          ZoomableAssetImage(
                            assetPath: diagramaSolucionGeneralAssetPath!,
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Diagrama de la solución general',
                            style: Theme.of(context).textTheme.labelSmall
                                ?.copyWith(color: cs.onSurfaceVariant),
                          ),
                        ],
                      ],
                    ),
                  ),
                ],
              );
            },
          ),

          const SizedBox(height: 16),
          const SizedBox(height: 16),
          // Apartado agrupado: Caso específico + Solución específica + Código + Playground
          PatternSection(
            title: 'Caso Específico',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Descripción del caso
                Text(
                  casoEspecifico,
                  style: Theme.of(
                    context,
                  ).textTheme.bodyMedium?.copyWith(color: cs.onSurface),
                ),
                const SizedBox(height: 12),
                // Solución específica
                Text(
                  'Solución Específica',
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                    color: cs.primary,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  solucionEspecifica,
                  style: Theme.of(
                    context,
                  ).textTheme.bodyMedium?.copyWith(color: cs.onSurface),
                ),
                if (diagramaSolucionEspecificaAssetPath != null &&
                    diagramaSolucionEspecificaAssetPath!.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  ZoomableAssetImage(
                    assetPath: diagramaSolucionEspecificaAssetPath!,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Diagrama de la solución específica',
                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: cs.onSurfaceVariant,
                    ),
                  ),
                ],
                if (codigoFuente != null || codeSnippets.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  Text(
                    'Código Fuente',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: cs.primary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  if (codigoFuente != null) codigoFuente!,
                  ...codeSnippets.map((s) => DartCodeBlock(snippet: s)),
                ],
                const SizedBox(height: 12),
                Text(
                  'Playground',
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                    color: cs.primary,
                  ),
                ),
                const SizedBox(height: 6),
                playground,
              ],
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/banner/banner.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/helpers/banner/skin.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';

Widget renderBanner(Variant variant, BannerProps props) {
  final s = skin(variant);
  final title = props.title ?? s.defaultTitle;

  return _DismissibleWrap(
    enabled: true,
    child: ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              color: s.container,
              border: Border.all(color: s.ring, width: 1),
              borderRadius: BorderRadius.circular(12),
            ),
            padding: const EdgeInsets.all(16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (title.isNotEmpty)
                        Text(
                          title,
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                      if ((props.description ?? '').isNotEmpty) ...[
                        const SizedBox(height: 4),
                        Text(props.description!),
                      ],
                      if ((props.actions ?? const <Widget>[]).isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            children: props.actions!,
                          ),
                        ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
              ],
            ),
          ),

          Positioned.fill(
            child: Align(
              alignment: Alignment.centerLeft,
              child: Container(width: 4, color: s.accent),
            ),
          ),
        ],
      ),
    ),
  );
}

class _DismissibleWrap extends StatefulWidget {
  final bool enabled;
  final Widget child;
  const _DismissibleWrap({required this.enabled, required this.child});
  @override
  State<_DismissibleWrap> createState() => _DismissibleWrapState();
}

class _DismissibleWrapState extends State<_DismissibleWrap> {
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    if (!_visible) return const SizedBox.shrink();
    if (!widget.enabled) return widget.child;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        widget.child,
        Positioned(
          right: 4,
          top: 4,
          child: Material(
            color: Colors.transparent,
            child: IconButton(
              icon: const Icon(Icons.close, size: 18),
              splashRadius: 18,
              tooltip: 'Close',
              onPressed: () => setState(() => _visible = false),
            ),
          ),
        ),
      ],
    );
  }
}

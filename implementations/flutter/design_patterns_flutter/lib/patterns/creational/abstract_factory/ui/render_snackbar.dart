import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/snackbar/snackbar.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/helpers/snackbar/skin.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';

class RenderSnackbar extends StatefulWidget {
  final Variant variant;
  final SnackbarProps props;
  const RenderSnackbar({super.key, required this.variant, required this.props});

  @override
  State<RenderSnackbar> createState() => _RenderSnackbarState();
}

class _RenderSnackbarState extends State<RenderSnackbar> {
  bool _shown = false;

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || _shown) return;
      _shown = true;
      final skinSb = skin(widget.variant);
      final title = widget.props.title;
      final msg = widget.props.message;

      final content = Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(skinSb.icon, color: skinSb.fg, size: 18),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                if ((title ?? '').isNotEmpty)
                  Text(
                    title!,
                    style: TextStyle(
                      color: skinSb.fg,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                if ((msg ?? '').isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 2),
                    child: Text(msg!, style: TextStyle(color: skinSb.fg)),
                  ),
              ],
            ),
          ),
        ],
      );

      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(
          SnackBar(
            behavior: SnackBarBehavior.floating,
            backgroundColor: skinSb.bg,
            duration: widget.props.duration,
            content: content,
          ),
        );
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}

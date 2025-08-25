import 'package:design_patterns_flutter/patterns/creational/abstract_factory/abstract_factory.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/snackbar/snackbar.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/ui/render_snackbar.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';

class SnackbarFactory implements NotificationFactory<SnackbarProps> {
  const SnackbarFactory();

  @override
  Widget createSuccess(BuildContext context, SnackbarProps props) =>
      RenderSnackbar(variant: Variant.success, props: props);

  @override
  Widget createAlert(BuildContext context, SnackbarProps props) =>
      RenderSnackbar(variant: Variant.alert, props: props);

  @override
  Widget createInformative(BuildContext context, SnackbarProps props) =>
      RenderSnackbar(variant: Variant.informative, props: props);

  @override
  Widget createWarning(BuildContext context, SnackbarProps props) =>
      RenderSnackbar(variant: Variant.warning, props: props);
}

const snackbarFactory = SnackbarFactory();

const String abstractFactory = r"""
import 'package:flutter/material.dart';

abstract class NotificationFactory<TProps> {
  Widget createSuccess(BuildContext context, TProps props);
  Widget createAlert(BuildContext context, TProps props);
  Widget createInformative(BuildContext context, TProps props);
  Widget createWarning(BuildContext context, TProps props);
}
""";

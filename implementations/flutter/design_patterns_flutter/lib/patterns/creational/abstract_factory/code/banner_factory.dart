const String bannerFactory = r"""
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/abstract_factory.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/banner/banner.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/ui/render_banner.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';

class BannerFactory implements NotificationFactory<BannerProps> {
  const BannerFactory();
  @override
  Widget createSuccess(BuildContext context, BannerProps props) =>
      renderBanner(Variant.success, props);
  @override
  Widget createAlert(BuildContext context, BannerProps props) =>
      renderBanner(Variant.alert, props);
  @override
  Widget createInformative(BuildContext context, BannerProps props) =>
      renderBanner(Variant.informative, props);
  @override
  Widget createWarning(BuildContext context, BannerProps props) =>
      renderBanner(Variant.warning, props);
}

const bannerFactory = BannerFactory();
""";

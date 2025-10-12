import 'package:flutter/widgets.dart';
import 'product/card.dart';

abstract class CardBuilder {
  CardBuilder setTitle(String title);
  CardBuilder setSubtitle(String subtitle);
  CardBuilder setMedia(String url);
  CardBuilder setBody(Widget content);
  CardBuilder setFooter(Widget content);
  CardProduct build();
}

import 'package:flutter/widgets.dart';
import 'builder.dart';
import 'product/card.dart';

class CardConcreteBuilder implements CardBuilder {
  CardProduct _product = const CardProduct();

  @override
  CardBuilder setTitle(String title) {
    _product = _product.copyWith(title: title);
    return this;
  }

  @override
  CardBuilder setSubtitle(String subtitle) {
    _product = _product.copyWith(subtitle: subtitle);
    return this;
  }

  @override
  CardBuilder setMedia(String url) {
    _product = _product.copyWith(mediaUrl: url);
    return this;
  }

  @override
  CardBuilder setBody(Widget content) {
    _product = _product.copyWith(body: content);
    return this;
  }

  @override
  CardBuilder setFooter(Widget content) {
    _product = _product.copyWith(footer: content);
    return this;
  }

  @override
  CardProduct build() {
    return _product;
  }
}

const String concreteBuilderCode = r"""
class CardConcreteBuilder implements CardBuilder {
  CardProduct _product = const CardProduct();

  @override
  CardBuilder setTitle(String title) { _product = _product.copyWith(title: title); return this; }
  @override
  CardBuilder setSubtitle(String subtitle) { _product = _product.copyWith(subtitle: subtitle); return this; }
  @override
  CardBuilder setMedia(String url) { _product = _product.copyWith(mediaUrl: url); return this; }
  @override
  CardBuilder setBody(Widget content) { _product = _product.copyWith(body: content); return this; }
  @override
  CardBuilder setFooter(Widget content) { _product = _product.copyWith(footer: content); return this; }

  @override
  CardProduct build() { return _product; }
}
""";

const String directorCode = r"""
class CardDirector {
  CardProduct construct(
    CardBuilder builder, {
    String? title,
    String? subtitle,
    String? mediaUrl,
    Widget? body,
    Widget? footer,
  }) {
    if (title != null && title.isNotEmpty) builder.setTitle(title);
    if (subtitle != null && subtitle.isNotEmpty) builder.setSubtitle(subtitle);
    if (mediaUrl != null && mediaUrl.isNotEmpty) builder.setMedia(mediaUrl);
    if (body != null) builder.setBody(body);
    if (footer != null) builder.setFooter(footer);
    return builder.build();
  }
}
""";

const String productCardCode = r"""
class CardProduct {
  final String? title;
  final String? subtitle;
  final String? mediaUrl;
  final Widget? body;
  final Widget? footer;

  const CardProduct({ this.title, this.subtitle, this.mediaUrl, this.body, this.footer });

  CardProduct copyWith({ String? title, String? subtitle, String? mediaUrl, Widget? body, Widget? footer, }) {
    return CardProduct(
      title: title ?? this.title,
      subtitle: subtitle ?? this.subtitle,
      mediaUrl: mediaUrl ?? this.mediaUrl,
      body: body ?? this.body,
      footer: footer ?? this.footer,
    );
  }
}

class ProductCard extends StatelessWidget {
  final CardProduct product;
  const ProductCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final hasHeader = (product.title != null && product.title!.isNotEmpty) || (product.subtitle != null && product.subtitle!.isNotEmpty);
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        border: Border.all(color: Theme.of(context).dividerColor),
        borderRadius: BorderRadius.circular(12),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (product.mediaUrl != null && product.mediaUrl!.isNotEmpty)
            SizedBox(height: 160, child: Image.network(product.mediaUrl!, fit: BoxFit.cover)),
          if (hasHeader)
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                if (product.title != null && product.title!.isNotEmpty)
                  Text(product.title!, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                if (product.subtitle != null && product.subtitle!.isNotEmpty)
                  Padding(padding: const EdgeInsets.only(top: 2), child: Text(product.subtitle!, style: Theme.of(context).textTheme.bodySmall)),
              ]),
            ),
          if (product.body != null) Padding(padding: const EdgeInsets.all(12), child: product.body!),
          if (product.footer != null) Container(padding: const EdgeInsets.all(12), child: product.footer!),
        ],
      ),
    );
  }
}
""";

const String demoCode = r"""
class BuilderDemo extends StatefulWidget { /* ... */ }
class _BuilderDemoState extends State<BuilderDemo> {
  String title = 'MacBook Pro 14"';
  String subtitle = 'M3 Pro';
  String mediaUrl = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop';
  String bodyText = 'Pantalla Liquid Retina XDR y batería de larga duración.';
  String footerText = 'Comprar';

  @override
  Widget build(BuildContext context) {
    final director = CardDirector();
    final builder = CardConcreteBuilder();
    final product = director.construct(
      builder,
      title: title,
      subtitle: subtitle,
      mediaUrl: mediaUrl,
      body: bodyText.isNotEmpty ? Text(bodyText) : null,
      footer: footerText.isNotEmpty ? ElevatedButton(onPressed: () {}, child: Text(footerText)) : null,
    );
    return ProductCard(product: product);
  }
}
""";

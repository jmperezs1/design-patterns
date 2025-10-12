import 'package:flutter/material.dart';

class CardProduct {
  final String? title;
  final String? subtitle;
  final String? mediaUrl;
  final Widget? body;
  final Widget? footer;

  const CardProduct({
    this.title,
    this.subtitle,
    this.mediaUrl,
    this.body,
    this.footer,
  });

  CardProduct copyWith({
    String? title,
    String? subtitle,
    String? mediaUrl,
    Widget? body,
    Widget? footer,
  }) {
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
    final hasHeader =
        (product.title != null && product.title!.isNotEmpty) ||
        (product.subtitle != null && product.subtitle!.isNotEmpty);
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        border: Border.all(color: Theme.of(context).dividerColor),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(blurRadius: 6, color: Colors.black.withOpacity(0.06)),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      constraints: const BoxConstraints(minWidth: 280),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (product.mediaUrl != null && product.mediaUrl!.isNotEmpty)
            SizedBox(
              height: 160,
              child: Image.network(
                product.mediaUrl!,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stack) => Container(
                  color: Theme.of(context).colorScheme.surfaceVariant,
                  alignment: Alignment.center,
                  child: const Icon(Icons.image_not_supported_outlined),
                ),
              ),
            ),
          if (hasHeader)
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (product.title != null && product.title!.isNotEmpty)
                    Text(
                      product.title!,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  if (product.subtitle != null && product.subtitle!.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(top: 2),
                      child: Text(
                        product.subtitle!,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Theme.of(
                            context,
                          ).textTheme.bodySmall?.color?.withOpacity(0.7),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          if (product.body != null)
            Padding(padding: const EdgeInsets.all(12), child: product.body!),
          if (product.footer != null)
            Container(
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(color: Theme.of(context).dividerColor),
                ),
                color: Theme.of(context).cardColor,
              ),
              padding: const EdgeInsets.all(12),
              child: product.footer!,
            ),
        ],
      ),
    );
  }
}

import 'package:design_patterns_flutter/patterns/behavioral/strategy/data/products.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/helpers.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/pricing_context.dart';
import 'package:flutter/material.dart';

class PricingCatalog extends StatefulWidget {
  const PricingCatalog({super.key});

  @override
  State<PricingCatalog> createState() => _PricingCatalogState();
}

class _PricingCatalogState extends State<PricingCatalog> {
  ClientType clientType = ClientType.standard;

  @override
  Widget build(BuildContext context) {
    final ctx = PricingContext(makeStrategy(clientType));
    final cs = Theme.of(context).colorScheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Wrap(
          spacing: 12,
          runSpacing: 8,
          crossAxisAlignment: WrapCrossAlignment.center,
          alignment: WrapAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Catálogo',
                  style: Theme.of(
                    context,
                  ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
                Text(
                  'Selecciona un tipo de cliente para aplicar la estrategia',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
              ],
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Tipo de cliente',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
                const SizedBox(width: 8),
                DropdownButton<ClientType>(
                  value: clientType,
                  onChanged: (v) =>
                      setState(() => clientType = v ?? ClientType.standard),
                  items: const [
                    DropdownMenuItem(
                      value: ClientType.standard,
                      child: Text('Standard'),
                    ),
                    DropdownMenuItem(
                      value: ClientType.gold,
                      child: Text('Gold (10% desc.)'),
                    ),
                    DropdownMenuItem(
                      value: ClientType.platinum,
                      child: Text('Platinum (5% desc.)'),
                    ),
                    DropdownMenuItem(
                      value: ClientType.vip,
                      child: Text('VIP (20% desc.)'),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 12),
        LayoutBuilder(
          builder: (context, c) {
            final threeCols = c.maxWidth > 900;
            final twoCols = c.maxWidth > 640;
            final crossAxisCount = threeCols
                ? 3
                : twoCols
                ? 2
                : 1;
            // Ajustar la altura de las tarjetas según columnas para evitar overflow
            final aspectRatio = threeCols
                ? 4 /
                      3 // más ancho, menos alto
                : twoCols
                ? 1.15 // un poco más alto
                : 0.9; // alto en 1 columna
            return GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: crossAxisCount,
                childAspectRatio: aspectRatio,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
              ),
              itemCount: products.length,
              itemBuilder: (context, i) {
                final p = products[i];
                return _ProductCard(key: ValueKey(p.id), product: p, ctx: ctx);
              },
            );
          },
        ),
      ],
    );
  }
}

class _ProductCard extends StatefulWidget {
  final Product product;
  final PricingContext ctx;
  const _ProductCard({super.key, required this.product, required this.ctx});

  @override
  State<_ProductCard> createState() => _ProductCardState();
}

class _ProductCardState extends State<_ProductCard> {
  int qty = 1;
  late final TextEditingController _qtyController;
  late final FocusNode _qtyFocus;

  @override
  void initState() {
    super.initState();
    _qtyController = TextEditingController(text: '$qty');
    _qtyFocus = FocusNode();
    _qtyFocus.addListener(() {
      if (!_qtyFocus.hasFocus) {
        // Normaliza al perder foco
        final n = int.tryParse(_qtyController.text) ?? 1;
        final clamped = n < 1 ? 1 : n;
        if (clamped != qty || _qtyController.text != '$clamped') {
          setState(() => qty = clamped);
          _qtyController.text = '$clamped';
          _qtyController.selection = TextSelection.collapsed(
            offset: _qtyController.text.length,
          );
        }
      }
    });
  }

  @override
  void dispose() {
    _qtyController.dispose();
    _qtyFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final unit = widget.ctx.getUnitPrice(widget.product.baseUnitPrice);
    final total = widget.ctx.getTotal(widget.product.baseUnitPrice, qty);

    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cs.outlineVariant),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          AspectRatio(
            aspectRatio: 16 / 9,
            child: Image.network(widget.product.imageUrl, fit: BoxFit.cover),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            widget.product.name,
                            style: Theme.of(context).textTheme.titleSmall
                                ?.copyWith(fontWeight: FontWeight.bold),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: cs.secondaryContainer,
                            borderRadius: BorderRadius.circular(999),
                          ),
                          child: Text(
                            'Base ${currency(widget.product.baseUnitPrice)}',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                        ),
                      ],
                    ),
                    if (widget.product.description != null) ...[
                      const SizedBox(height: 4),
                      Text(
                        widget.product.description!,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: cs.onSurfaceVariant,
                        ),
                      ),
                    ],
                    const Divider(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Precio unitario',
                          style: Theme.of(context).textTheme.bodySmall
                              ?.copyWith(color: cs.onSurfaceVariant),
                        ),
                        Text(
                          currency(unit),
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Row(
                          children: [
                            Text(
                              'Cant.',
                              style: Theme.of(context).textTheme.bodySmall
                                  ?.copyWith(color: cs.onSurfaceVariant),
                            ),
                            const SizedBox(width: 8),
                            SizedBox(
                              width: 84,
                              child: TextField(
                                keyboardType: TextInputType.number,
                                decoration: const InputDecoration(
                                  hintText: '1',
                                ),
                                controller: _qtyController,
                                focusNode: _qtyFocus,
                                onChanged: (s) {
                                  // No reescribas el controlador mientras se escribe para no perder el foco
                                  final n = int.tryParse(s);
                                  setState(
                                    () => qty = (n == null || n < 1) ? 1 : n,
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                        Text(
                          currency(total),
                          style: Theme.of(context).textTheme.titleSmall
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

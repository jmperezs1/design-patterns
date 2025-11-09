import 'dart:math';

class FlyItem {
  final String variant; // pill | rounded-outline | chip
  final String text;
  final double x;
  final double y;
  final String color; // hex

  FlyItem({
    required this.variant,
    required this.text,
    required this.x,
    required this.y,
    required this.color,
  });
}

List<FlyItem> makeData(int count) {
  final rnd = Random(42);
  final variants = ['chip', 'pill', 'rounded-outline'];
  final colors = [
    '#0f172a',
    '#0ea5a4',
    '#7c3aed',
    '#dc2626',
    '#0ea5a4',
    '#334155',
  ];

  return List.generate(count, (i) {
    final v = variants[rnd.nextInt(variants.length)];
    final text = 'Item ${i + 1}';
    final x = (rnd.nextDouble() * 900).floorToDouble();
    final y = (rnd.nextDouble() * 380).floorToDouble();
    final color = colors[rnd.nextInt(colors.length)];
    return FlyItem(variant: v, text: text, x: x, y: y, color: color);
  });
}

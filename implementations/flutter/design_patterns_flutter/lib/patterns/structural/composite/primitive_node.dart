import 'component.dart';

class PrimitiveNode implements JsonComponent {
  @override
  final String keyLabel;
  final Object? value;

  PrimitiveNode(this.keyLabel, this.value);

  @override
  bool isLeaf() => true;

  @override
  String getPreview() {
    if (value == null) return 'null';
    if (value is String) return '"${value.toString()}"';
    return value.toString();
  }

  @override
  List<JsonComponent> getChildren() => const [];
}

import 'component.dart';

class ObjectNode implements JsonComponent {
  @override
  final String keyLabel;
  final List<JsonComponent> _kids;

  ObjectNode(this.keyLabel, Map<String, dynamic> obj, JsonComponent Function(String, dynamic) buildNode)
      : _kids = obj.entries.map((e) => buildNode(e.key, e.value)).toList();

  @override
  bool isLeaf() => false;

  @override
  String getPreview() => '{… ${_kids.length} }';

  @override
  List<JsonComponent> getChildren() => _kids;
}

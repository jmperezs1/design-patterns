import 'component.dart';

class ArrayNode implements JsonComponent {
  @override
  final String keyLabel;
  final List<JsonComponent> _kids;

  ArrayNode(this.keyLabel, List<dynamic> arr, JsonComponent Function(String, dynamic) buildNode)
      : _kids = List.generate(arr.length, (i) => buildNode(i.toString(), arr[i]));

  @override
  bool isLeaf() => false;

  @override
  String getPreview() => '[ … ${_kids.length} ]';

  @override
  List<JsonComponent> getChildren() => _kids;
}

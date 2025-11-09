abstract class JsonComponent {
  String get keyLabel;
  bool isLeaf();
  String getPreview();
  List<JsonComponent> getChildren();
}

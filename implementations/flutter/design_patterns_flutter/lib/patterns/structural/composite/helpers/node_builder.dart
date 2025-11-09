import '../types/json.dart';
import '../component.dart';
import '../primitive_node.dart';
import '../array_composite.dart';
import '../object_composite.dart';

JsonComponent buildNode(String keyLabel, Json value) {
  if (value is List) return ArrayNode(keyLabel, value, buildNode);
  if (value is Map<String, dynamic>) return ObjectNode(keyLabel, value, buildNode);
  return PrimitiveNode(keyLabel, value);
}

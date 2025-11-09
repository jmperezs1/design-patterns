import { ArrayNode } from '../array-composite';
import { ObjectNode } from '../object-composite';
import { PrimitiveNode } from '../leaf';
import type { JsonValue as Json } from '../types/json';
import type { JsonComponent } from '../component';

export function buildNode(keyLabel: string, json: Json): JsonComponent {
  if (json === null) return new PrimitiveNode(keyLabel, null);
  if (Array.isArray(json)) {
    const children = json.map((v, i) => buildNode(String(i), v));
    return new ArrayNode(keyLabel, children);
  }
  if (typeof json === 'object') {
    const children = Object.keys(json).map(k => buildNode(k, (json as any)[k]));
    return new ObjectNode(keyLabel, children);
  }
  // primitive
  return new PrimitiveNode(keyLabel, json as string | number | boolean);
}
